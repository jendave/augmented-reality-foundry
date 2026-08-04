#!/usr/bin/env node
/**
 * Convert "Roll twice" text results into two document results that reference
 * the same roll table (Foundry rolls twice on overlapping ranges).
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packDir = path.join(__dirname, '../json-packs/augmented-reality-rolltables')

const MODULE = 'augmented-reality-foundry'
const COMPENDIUM = 'augmentedrealityrolltables'

function resultPlainText(result) {
	const raw = result.description ?? result.text ?? ''
	return raw.replace(/<\/?p>/gi, '').trim()
}

function rollInstructionInfo(text) {
	if (!text) return null
	const trimmed = text.replace(/<\/?p>/gi, '').trim()
	const normalized = trimmed.replace(/\.+$/, '').toLowerCase()

	if (normalized === 'roll twice') {
		return { count: 2, label: trimmed }
	}
	if (normalized === 'roll three times') {
		return { count: 3, label: trimmed }
	}
	if (/\(roll twice\)$/.test(normalized)) {
		return { count: 2, label: trimmed }
	}
	if (/\(roll three times\)$/.test(normalized)) {
		return { count: 3, label: trimmed }
	}
	if (normalized.startsWith('roll twice more on this table')) {
		return { count: 2, label: trimmed }
	}
	if (normalized.startsWith('roll twice;')) {
		return { count: 2, label: trimmed }
	}
	return null
}

function isRollInstructionResult(result) {
	return rollInstructionInfo(resultPlainText(result)) != null
}

function genId(existing) {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	do {
		let id = ''
		const bytes = crypto.randomBytes(16)
		for (let i = 0; i < 16; i++) id += chars[bytes[i] % chars.length]
		if (!existing.has(id)) return id
	} while (true)
}

function documentUuid(tableId) {
	return `Compendium.${MODULE}.${COMPENDIUM}.RollTable.${tableId}`
}

function makeDocumentResult(source, tableId, tableName, id, label) {
	return {
		range: [...source.range],
		_id: id,
		type: 'document',
		weight: source.weight ?? 1,
		drawn: false,
		flags: {},
		img: source.img ?? 'icons/dice/d10black.svg',
		description: `<p>${label}</p>`,
		name: tableName,
		documentUuid: documentUuid(tableId),
		_key: `!tables.results!${tableId}.${id}`
	}
}

function processTable(doc) {
	const tableId = doc._id
	if (!tableId || !doc.results) return false

	const rollInstructionResults = doc.results.filter((r) =>
		isRollInstructionResult(r)
	)
	if (rollInstructionResults.length === 0) return false

	const info = rollInstructionInfo(resultPlainText(rollInstructionResults[0]))
	if (!info) return false

	const documentResults = rollInstructionResults.filter((r) => r.type === 'document')
	if (documentResults.length >= info.count) return false

	const existingIds = new Set(doc.results.map((r) => r._id))
	const source = rollInstructionResults[0]

	doc.results = doc.results.filter((r) => !isRollInstructionResult(r))

	const ids = []
	if (documentResults.length > 0) {
		ids.push(...documentResults.slice(0, info.count).map((r) => r._id))
	} else if (source._id) {
		ids.push(source._id)
	}

	while (ids.length < info.count) {
		const id = genId(existingIds)
		existingIds.add(id)
		ids.push(id)
	}

	for (const id of ids.slice(0, info.count)) {
		doc.results.push(
			makeDocumentResult(source, tableId, doc.name, id, info.label)
		)
	}

	return true
}

let updated = 0
for (const file of fs.readdirSync(packDir).sort()) {
	if (!file.endsWith('.json')) continue
	const filePath = path.join(packDir, file)
	const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'))
	if (!doc.formula) continue
	if (!processTable(doc)) continue
	fs.writeFileSync(filePath, `${JSON.stringify(doc, null, 2)}\n`)
	console.log(`updated ${file}`)
	updated++
}

console.log(`\nDone. Updated ${updated} tables.`)
