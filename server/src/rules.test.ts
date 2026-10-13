import test from 'node:test'; import assert from 'node:assert/strict'; import {addCalendarDays,overdueDays,outstanding} from './rules.js';
test('15 calendar days after October 1 is October 16',()=>{const d=addCalendarDays(new Date(2026,9,1),15);assert.equal(d.getDate(),16);});
test('renewal extends existing due date',()=>assert.equal(addCalendarDays(addCalendarDays(new Date(2026,9,1),15),15).getDate(),31));
test('partial returns retain outstanding quantity',()=>assert.equal(outstanding(5,2),3));
test('rejects excessive return',()=>assert.throws(()=>outstanding(5,6)));
test('overdue calendar days',()=>assert.equal(overdueDays(new Date(2026,9,16),new Date(2026,9,19)),3));
