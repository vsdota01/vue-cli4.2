/**
 * 附件商城模块
 */
export default {
  name: "coupon",
  path: "/coupon",
  component: resolve =>
    require.ensure(
      [],
      () => resolve(require("@/views/coupon/index")),
      "coupon"
    ),
  meta: { auth: true, index: 3 },
  children: [
    {
      path: "bag",
      component: resolve =>
        require.ensure(
          [],
          () => resolve(require("@/views/coupon/bag/index.vue")),
          "coupon"
        ),
      meta: { auth: true, noHeader: true, index: 4 }
    }
  ]
};
