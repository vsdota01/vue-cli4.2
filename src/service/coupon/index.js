import request from "../request";

const prefix = "/content-service";
// 我的券接口
export const queryMyTickets = params =>
  request(prefix + "/common/ticket/myTickets", { params });
// 查询券详情
export const queryTicketDetails = params =>
  request(prefix + "/common/ticket/ticketDetails", { params });
