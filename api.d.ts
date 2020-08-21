interface IPages {
  pageNo: number,
  total: number
}

// 1.订单列表 - /api/orders/list（5种状态下的订单列表数据）
interface OrderListParams {
  token: string,
  type: number,  // 1：待付款 2：待发货 3：待收货 4：已完成 5：退款/售后
};
interface OrderListItem {
  orderNo: string, // 订单编号
  orderId: number, // 订单id
  thumbnail: string, // 商品缩略图
  title: string, // 商品标题（这里拼接【用户下单时】选择的规格名称）
  payAmount: number, // 付款金额（用户下单时付款的实际金额）
  num: number, // 购买数量（用户下单时选择的商品数量）
  countDown: number, // （注意：只在待付款时返回，待支付的倒计时时间戳（【毫秒数！！！！】））
  refundStatus: boolean, // 退款状态 1：退款中 2：成功 3：失败 （注意：只在退款/售后时返回）
  failReason: string, // 退款失败原因（注意：只在退款/售后时返回）
}
interface OrderListResponse {
  status: number,
  data: {
    pages: IPages,
    data: OrderListItem[]
  }
}



