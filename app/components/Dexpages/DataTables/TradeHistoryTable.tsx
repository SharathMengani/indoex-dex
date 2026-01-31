"use client";
import { getFormattedDateTime, getNumberTransformed } from "../../../utils";
import { TableWrapper, TradeNoData } from "../AccountsTabTables";
import { usePagination } from "../../../lib/hooks/usepagination";
import { PaginateSelect } from "./NumberSelect";

/* ------------------------ TRADE HISTORY TABLE ------------------------ */
export const TradeHistoryTable = ({ trades, symbolmapping }: { trades: any[], symbolmapping: any }) => {
    const { page, setPage, pageCount, paginatedData: paginatedTrades, setNumber, number } = usePagination(trades);
    return (
        <>
            <TableWrapper>
                <thead>
                    <tr className="sticky top-0">
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Coin</th>
                        <th className="px-4 py-3">Direction</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Trade Value</th>
                        <th className="px-4 py-3">Fee</th>
                        <th className="px-4 py-3">Closed PNL</th>
                    </tr>
                </thead>

                {paginatedTrades.length !== 0 ? (
                    <tbody>
                        {paginatedTrades.map((t, i) => {
                            const { date, timeAMPM } = getFormattedDateTime(t.time);
                            const tradeValue = Number(t.sz) * Number(t.px);

                            return (
                                <tr key={i}>
                                    {/* Time */}
                                    <td className="px-4 py-3">
                                        <div>{date}</div>
                                        <div className="text-[12px]">{timeAMPM}</div>
                                    </td>

                                    {/* Coin */}
                                    <td className="px-4 py-3">{symbolmapping[t.coin.replace('@', '')] || t.coin}</td>

                                    {/* Direction */}
                                    <td
                                        className={`px-4 py-3 ${t.side === "B"
                                            ? "text-[#2BB94D]"
                                            : "text-[#e90c27]"
                                            }`}
                                    >
                                        {t.side === "B" ? "Long" : "Short"}
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3">{t.px}</td>

                                    {/* Size */}
                                    <td className="px-4 py-3">{t.sz}</td>

                                    {/* Trade Value */}
                                    <td className="px-4 py-3">
                                        {getNumberTransformed(tradeValue)}
                                    </td>

                                    {/* Fee */}
                                    <td
                                        className={`px-4 py-3 ${Number(t.fee) < 0
                                            ? "text-[#e90c27]"
                                            : "text-[#2BB94D]"
                                            }`}
                                    >
                                        {t.fee}
                                    </td>

                                    {/* Closed PNL */}
                                    <td
                                        className={`px-4 py-3 ${Number(t.closedPnl) >= 0
                                            ? "text-[#2BB94D]"
                                            : "text-[#e90c27]"
                                            }`}
                                    >
                                        {t.closedPnl}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <TradeNoData data={trades} />
                )}
            </TableWrapper>

            {/* PAGINATION */}
            <PaginateSelect setPage={setPage} pageCount={pageCount} number={number} setNumber={setNumber} data={trades} page={page} />


        </>
    );
};
