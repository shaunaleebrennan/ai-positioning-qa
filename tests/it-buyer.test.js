import test from 'node:test';
import assert from 'node:assert/strict';
import {analyse,evidenceFor,summary,verdict,profiles,buyingRoles,goals,react,rewriteBrief} from '../docs/assets/js/it-engine.js';
const base={persona:'executive',buyingRole:'owner',goal:'shortlist',awareness:'Problem aware',region:'global',assetType:'Headline / paid ad',message:'Manual work creates delays. Reduce support cost with a connected workflow.',proof:'',solution:'',alternatives:''};
test('supplied proof cannot inflate the message score',()=>{const a=analyse(base),b=analyse({...base,proof:'proven customer research pilot validated % SLA SOC 2 integrated governed cost savings'});assert.deepEqual(a.scores,b.scores);assert.equal(a.total,b.total);});
test('matched excerpts preserve original whitespace and cannot come from supplied proof',()=>{const r=analyse({...base,message:'Manual work\n creates delays.\n\nIntegrate existing workflows.',proof:'Certified proof'});for(const id of Object.keys(r.scores)){const quote=evidenceFor(r,id);if(quote)assert.ok(r.message.includes(quote));}assert.equal(evidenceFor(r,'proof'),'');});
test('all IT lenses and roles remain bounded across purchase stages',()=>{for(const persona of Object.keys(profiles))for(const buyingRole of Object.keys(buyingRoles))for(const goal of Object.keys(goals)){const r=analyse({...base,persona,buyingRole,goal});assert.ok(r.total>=0&&r.total<=100);for(const id of r.ranked)assert.ok(r.audit.rows[id].weight>0&&r.scores[id]<4);assert.doesNotMatch(verdict(r)[0],/Ready to progress/);}});
test('Buyer remit and decision role change the reaction without changing numerical score',()=>{
  const a=analyse(base),b=analyse({...base,persona:'security'}),c=analyse({...base,buyingRole:'champion'});
  assert.equal(a.total,b.total);assert.equal(a.total,c.total);
  assert.notEqual(react(a),react(b));assert.notEqual(react(a),react(c));
  assert.match(react(b),/data go, who can access it/);
  assert.match(rewriteBrief(b),/data go, who can access it/);
});
test('General IT and unknown purchase role work without assuming a CIO',()=>{
  const broad=analyse({...base,persona:'general',buyingRole:'unknown'});
  assert.equal(broad.total,analyse(base).total);
  assert.match(react(broad),/belongs in an IT evaluation/);
  assert.match(rewriteBrief(broad),/Where does this sit alongside/);
  assert.doesNotMatch(react(broad),/CFO|CEO/);
});
test('export preserves awareness, review context, scoring basis and source',()=>{const r=analyse({...base,proof:'Pilot report pending verification',alternatives:'Current workflow',solution:'Service tool'}),s=summary(r);for(const term of [r.message,r.proof,r.alternatives,r.solution,r.awareness,'Rewrite brief','Messaging score','Rubric','not calibrated','Why this score?'])assert.ok(s.includes(term));});
