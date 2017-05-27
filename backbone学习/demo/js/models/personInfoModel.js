/**
 * person info model.
 */

directory.personInfoModel = Backbone.Model.extend( {
  url: '/getPersonInfo',
  defaults:{
    name: '蒙其·D·路飞',
    position: '下一代海贼王',
    avatar: 'pics/6.jpg',
    introduction: '蒙奇·D·路飞，是草帽海贼团船长。由于他的标志性特征是一顶草帽，因此常被直接称呼为草帽。梦想是找到传说中的ONE PIECE，成为海贼王。性格积极乐观，爱憎分明且十分重视伙伴，对任何危险的事物都超感兴趣。看似白痴，却是一个大智若愚型的无愧船长之职的人。和其他传统的海贼所不同的是，他并不会为了追求财富而无故杀戮，而是享受着身为海贼的冒险。',
    id: 6
  },

  initialize: function(){

  }
});
