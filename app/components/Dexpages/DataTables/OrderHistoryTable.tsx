"use client";
import { usePagination } from "../../../lib/hooks/usepagination";
import { getFormattedDateTime, toTitleCase } from "../../../utils";
import { TableWrapper, TradeNoData } from "../AccountsTabTables";
import { PaginateSelect } from "./NumberSelect";

/* ------------------------ ORDER HISTORY TABLE ------------------------ */
export const OrderHistoryTable = ({ history, symbolmapping }: { history: any[], symbolmapping: any }) => {
    const { page, setPage, pageCount, paginatedData: paginatedTrades, setNumber, number } = usePagination(history);
    return (
        <>
            <TableWrapper>
                <thead>
                    <tr className="sticky top-0">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Coin</th>
                        <th className="px-4 py-3">Direction</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Filled Size</th>
                        <th className="px-4 py-3">Order Value</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Reduce Only</th>
                        <th className="px-4 py-3">Trigger Condition</th>
                        <th className="px-4 py-3">TP/SL</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>

                {paginatedTrades.length !== 0 ? (
                    <tbody>
                        {paginatedTrades.map((h, i) => {
                            const order = h.order;
                            const { date, timeAMPM } = getFormattedDateTime(h.statusTimestamp);

                            return (
                                <tr key={i}>

                                    {/* Order ID */}
                                    <td className="px-4 py-3">{order.oid}</td>
                                    {/* Time */}
                                    <td className="px-4 py-3">
                                        <div>{date}</div>
                                        <div className="text-[12px]">{timeAMPM}</div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">{order.orderType}</td>

                                    {/* Coin */}
                                    <td className="px-4 py-3">{symbolmapping[order.coin.replace('@', '')] || order.coin}</td>

                                    {/* Direction */}
                                    <td
                                        className={`px-4 py-3 ${order.side === "B" ? "text-[#2BB94D]" : "text-[#e90c27]"
                                            }`}
                                    >
                                        {order.side === "B" ? "Long" : "Short"}
                                    </td>

                                    {/* Size */}
                                    <td className="px-4 py-3">{order.sz}</td>

                                    {/* Filled Size */}
                                    <td className="px-4 py-3">
                                        {Number(order.origSz) - Number(order.sz)}
                                    </td>

                                    {/* Order Value */}
                                    <td className="px-4 py-3">
                                        {order.orderValue ?? "--"}
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">
                                        {order.limitPx ?? "--"}
                                    </td>

                                    {/* Reduce Only */}
                                    <td className="px-4 py-3">{order.reduceOnly ? "Yes" : "No"}</td>

                                    {/* Trigger Condition */}
                                    <td className="px-4 py-3">
                                        {order.triggerCondition ?? "--"}
                                    </td>

                                    {/* TP/SL */}
                                    <td className="px-4 py-3">
                                        {order.isTrigger ? <button>View</button> : "--"}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">{toTitleCase(h.status)}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <TradeNoData data={history} />
                )}
            </TableWrapper>
            <PaginateSelect setPage={setPage} pageCount={pageCount} number={number} setNumber={setNumber} data={history} page={page} />
        </>
    )
};
