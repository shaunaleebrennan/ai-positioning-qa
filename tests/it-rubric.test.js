import test from 'node:test';
import assert from 'node:assert/strict';
import {ITRubric as R} from '../docs/assets/js/it-rubric.js';
const assess=(message, extra={})=>R.assess({message,goal:'shortlist',assetType:'Sales pitch / deck',...extra});
const weak='Reimagine work with our game-changing AI-powered platform. One intelligent experience connects your people, knowledge and tools so every employee can move faster and unlock productivity.';
const strong='Frontline employees struggle to find shift policies because scattered content delays answers. Rather than adding another portal, improve policy search by using one entry point. Our service connects to SharePoint to retrieve approved files. SharePoint remains the system of record; access requires configured permissions. IT administrators restrict data access to authorised users; actions require human approval before changes. Source: ExampleCo pilot report, September 2026, across 200 employees: by improving policy search, time to find answers fell from 8 minutes to 3 minutes over 6 weeks. Review the pilot report and compare the workflow.';
const pile='ROI, governance, integration, customer, proven, pilot, security, data, cost, adoption, efficiency.';
const check=test;
check('Concrete message scores above generic hype and keyword list',()=>{
  assert(assess(strong).total>assess(weak).total+40);
  assert(assess(pile).total<30);
});
check('Repeating identical copy cannot increase the score',()=>{
  for(const text of [weak,strong,pile]) assert(assess((text+'\n').repeat(8)).total<=assess(text).total);
});
check('Background proof and persona choices cannot inflate numerical score',()=>{
  const base=assess(weak).total;
  for(const persona of ['ai','executive','workplace','security']) assert.equal(assess(weak,{persona,proof:strong}).total,base);
  assert.equal(assess(weak,{proof:strong}).status,'Supplied · unverified');
});
check('References remain unverified, placeholders earn no evidence points',()=>{
  assert.equal(assess(strong).status,'Referenced · unverified');
  assert.equal(assess('Source: [PROOF NEEDED]. We reduce costs by 40%.').rows.proof.level,0);
  const r=assess(strong+' We reduce costs by 90%.');
  assert(r.rows.proof.level<=1); assert(r.rows.proof.cap);
});
check('Absolute assurance limits trust and surfaces the offending passage',()=>{
  const r=assess(strong+' Zero data retention.');
  assert.equal(r.rows.trust.level,1);assert.equal(r.rows.trust.quote,'Zero data retention.');
  assert.match(r.rows.trust.next,/absolute assurance/);
});
check('Negated value and integration do not earn positive credit',()=>{
  const r=assess('Our product cannot integrate with Microsoft 365. It does not reduce support costs. Our teams cannot prove AI ROI.');
  assert.equal(r.rows.value.level,0);assert.equal(r.rows.fit.level,0);
});
check('A publisher name alone cannot earn traceable proof credit',()=>{
  const r=assess('According to Gartner, our workflow cuts support tickets by 20% for 100 employees over 4 weeks.');
  assert.equal(r.rows.proof.level,1);
});
check('Negated controls do not earn full trust credit',()=>{
  const positive=assess('IT admins restrict access to approved records only.');
  const negative=assess('IT admins never restrict access to approved records only.');
  assert.equal(positive.rows.trust.level,4);assert(negative.rows.trust.level<=1);
});
check('Vendor substitutions do not change fit credit',()=>{
  const template='We integrate with VENDOR and keep VENDOR in place. The connector requires configured VENDOR access.';
  for(const name of ['Salesforce','HubSpot','Freshservice','SomeNewPlatform']) assert.equal(assess(template.replaceAll('VENDOR',name),{goal:'evaluation'}).rows.fit.level,4);
});
check('Measurement plans are not treated as achieved results',()=>{
  const r=assess(strong+' We will compare baseline tickets for 100 employees over 4 weeks.');
  assert.equal(r.rows.proof.level,4);
  assert.equal(r.claims.at(-1).context,'Estimate or hypothesis');
});
check('High-risk assertions qualify the verdict even at a high score',()=>{
  const r=assess(strong+' Source: Acme control document guarantees fully compliant access controls across our workflow.',{goal:'evaluation'});
  assert(r.total>=80);assert.equal(r.label,'Claim review required');
});
check('Investments, adoption and pricing retain their actual meaning',()=>{
  const c=R.claims('Built on a $1B AI investment. 90% adoption across 200 users. Pricing is $3/user/month. IT can only approve authorised requests.');
  assert(c.some(x=>x.type==='Vendor investment figure'));
  assert(c.some(x=>x.type==='Adoption or usage figure'));
  assert(c.some(x=>x.type==='Pricing claim'));
  assert(!c.some(x=>x.type==='Comparative or category claim'));
  assert.equal(R.claims('Our organisation can’t prove AI ROI.').length,0);
});
check('Decimals and source URLs survive passage parsing',()=>{
  const s='Source: https://example.com/report/v1.2 results show 14.5% adoption.';
  assert.equal(R.passages(s).length,1);assert.equal(R.passages(s)[0],s);
});
check('Headline expectations omit procurement detail and full success metric',()=>{
  const r=assess('Frontline employees cannot find shift policies, causing delays. Rather than add another portal, help frontline employees find answers faster by using policy search.',{goal:'attention',assetType:'Headline / paid ad'});
  assert.equal(r.weights.fit,0);assert.equal(r.weights.trust,0);assert.equal(r.weights.proof,0);
  assert.equal(r.rows.value.level,4);assert.match(r.rows.value.anchors[4],/beneficiary/);
});
check('The same short message faces different format expectations at evaluation',()=>{
  const text='Frontline employees struggle to find shift policies because scattered content delays answers. Rather than adding another portal, improve policy search by using one entry point.';
  const headline=assess(text,{assetType:'Headline / paid ad'});
  const pitch=assess(text,{assetType:'Sales pitch / deck'});
  assert.equal(headline.total,95); // independently: 40 + 3/4×20 + 40
  assert.equal(pitch.total,43); // independently: 20 + 3/4×20 + 3/4×10, rounded once
  assert(headline.total>pitch.total+35);
  assert.equal(headline.weights.proof,0);
  assert.equal(pitch.weights.proof,20);
  assert.equal(headline.rows.clarity.level,4);
  assert.equal(pitch.rows.clarity.level,3);
});
check('When basic comprehension fails, the first edit addresses it before later gaps',()=>{
  const r=assess('ROI, governance, integration, customer, proven, pilot, security, data, cost, adoption, efficiency.');
  assert(r.rows.clarity.level<2);
  assert.equal(r.ranked[0],'clarity');
});
check('Common inflected task verbs retain buyer-pressure credit in concise copy',()=>{
  const natural='IT teams waste time finding policies because knowledge sits in scattered tools. Rather than add another portal, help staff find approved answers faster through one place.';
  const paraphrase='IT teams waste time as they find policies because knowledge sits in scattered tools. Rather than add another portal, help staff find approved answers faster through one place.';
  for(const message of [natural,paraphrase]) {
    const result=assess(message,{goal:'attention',assetType:'Headline / paid ad'});
    assert.equal(result.rows.relevance.level,4);
    assert.equal(result.total,100);
  }
  assert(assess('ROI, governance, integration, customer, proven, pilot, security, data, cost, adoption, efficiency.').total<30);
});
check('Short asset rules work at every stage; unrelated assertions still receive a warning',()=>{
  for(const goal of Object.keys(R.stages)) {
    const r=assess('IT teams struggle to resolve tickets because manual routing delays employees. Reduce support tickets by using one intake.',{goal,assetType:'Headline / paid ad'});
    assert.equal(r.weights.fit,0);assert.equal(r.weights.trust,0);assert.equal(r.weights.proof,0);
    assert.equal(r.rows.clarity.anchors[4],'A clear, restrained headline; no CTA required');
  }
  const risky=assess('Zero data retention. IT teams struggle to resolve tickets because manual routing delays employees.',{goal:'attention',assetType:'Headline / paid ad'});
  assert.equal(risky.label,'Claim review required');
});
check('Long copy pasted as a headline cannot obtain full clarity credit',()=>{
  const r=assess(strong,{assetType:'Headline / paid ad'});
  assert.equal(r.rows.clarity.level,2);
  assert.match(r.rows.clarity.reason,/45-word/);
});
check('All listed format and stage combinations have explicit 100-point weights',()=>{
  for(const goal of Object.keys(R.stages))for(const assetType of Object.keys(R.formats)){
    const r=assess(weak,{goal,assetType});
    assert.equal(Object.values(r.weights).reduce((n,w)=>n+w,0),100);
    assert.equal(r.format,assetType);
    assert.equal(r.total,Math.round(Object.values(r.rows).reduce((n,x)=>n+x.level/4*x.weight,0)));
  }
});
check('Every context has 100 available points and a reproducible total',()=>{
  for(const goal of ['attention','shortlist','evaluation']) for(const assetType of ['Headline / paid ad','Sales pitch / deck','IT-focused strategic narrative']) for(const message of ['',weak,strong,pile]) {
    const r=assess(message,{goal,assetType});
    assert.equal(Object.values(r.weights).reduce((a,b)=>a+b,0),100);
    assert.equal(r.total,Math.round(Object.values(r.rows).reduce((n,x)=>n+x.level/4*x.weight,0)));
    assert(r.total>=0&&r.total<=100);
    for(const id of r.ranked)assert(r.rows[id].weight>0&&r.rows[id].level<4);
  }
});
