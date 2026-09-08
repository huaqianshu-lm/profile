const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export const dom = Object.freeze({
  hero: $('#hero'),
  stickyStage: $('#hero .sticky'),
  canvas: $('#c'),
  themeToggle: $('#themeToggle'),
  themeToggleLabel: $('#themeToggleLabel'),
  themeColorMeta: $('#themeColor'),
  mobileNavToggle: $('#mobileNavToggle'),
  mobileNavPanel: $('#mobileNavPanel'),
  navJumps: $$('.nav-jump'),
  copy: $('#copy'),
  seedNote: $('#seedNote'),
  phase: $('#phase'),
  pct: $('#pct'),
  bar: $('#bar'),
  scroll: $('.scroll'),
  nodeLayer: $('#nodeLayer'),
  cardLayer: $('#cardLayer'),
  bridge: $('#bridge'),
  worksStageTitle: $('#worksStageTitle'),
  globalState: $('#globalState'),
  methodLayer: $('#methodLayer'),
  methodSourceLayer: $('#methodSourceLayer'),
  methodSources: $$('.method-source'),
  methodHeaderEls: $$('#methodLayer .module-eyebrow, #methodLayer .module-title, #methodLayer .module-lead'),
  thinkNode: $('#thinkNode'),
  buildNode: $('#buildNode'),
  connectNode: $('#connectNode'),
  methodCenter: $('#methodCenter'),
  methodLayout: $('#methodLayout'),
  methodLine1: $('#methodLine1'),
  methodLine2: $('#methodLine2'),
  methodLine3: $('#methodLine3'),
  exploreLayer: $('#exploreLayer'),
  exploreField: $('#exploreField'),
  exploreHeaders: $$('.explore-header'),
  exploreFragments: $$('.explore-fragment'),
  exploreOrigin: $('#exploreOrigin'),
  endLayer: $('#endLayer'),
  endContent: $('#endContent'),
  endGatherDots: $$('.end-gather-dot'),
  endPoint: $('#endPoint'),
  endHeadline: $('#endHeadline'),
  endName: $('#endName'),
  endTags: $('#endTags'),
  endContact: $('#endContact'),
  endEmailLink: $('#endEmailLink'),
  endWhisper: $('#endWhisper'),
  workDetailLayer: $('#workDetailLayer'),
  workDetailCard: $('#workDetailCard'),
  workDetailClose: $('#workDetailClose'),
  workDetailIndex: $('#workDetailIndex'),
  workDetailPreview: $('#workDetailPreview'),
  workDetailKicker: $('#workDetailKicker'),
  workDetailTitle: $('#workDetailTitle'),
  workDetailTagline: $('#workDetailTagline'),
  workDetailDescription: $('#workDetailDescription'),
  workDetailRole: $('#workDetailRole'),
  workDetailStatus: $('#workDetailStatus'),
  workDetailYear: $('#workDetailYear'),
  workDetailAction: $('#workDetailAction'),
  workDetailTags: $('#workDetailTags')
});

export function assertDom(required = ['hero', 'canvas', 'cardLayer', 'workDetailLayer']) {
  const missing = required.filter(key => !dom[key]);
  if (missing.length) throw new Error(`Profile DOM is missing: ${missing.join(', ')}`);
  return dom;
}

export { $, $$ };
