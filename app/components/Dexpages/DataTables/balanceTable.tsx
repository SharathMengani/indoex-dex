"use client";
import { usePagination } from "../../../lib/hooks/usepagination";
import { getAssetInfo, getNumberTransformed } from "../../../utils";
import { TableWrapper } from "../AccountsTabTables";
import { PaginateSelect } from "./NumberSelect";


export const BalancesTable = ({ balances, positions, perpsEquity, mids }: { balances: any[], positions: any[], perpsEquity: any, mids: any }) => {
    const { page, setPage, pageCount, paginatedData: paginatedTrades, setNumber, number } = usePagination(balances);
    
    return (
        <>
            <TableWrapper>
                <thead>
                    <tr className="sticky top-0">
                        <th className="px-4 py-3">Asset</th>
                        <th className="px-4 py-3">Total Balance</th>
                        <th className="px-4 py-3">Available</th>
                        <th className="px-4 py-3">In Orders</th>
                        <th className="px-4 py-3">Value (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={-1}>
                        <td className="px-4 py-3">USDC (Perps)</td>
                        <td className="px-4 py-3">{getNumberTransformed(perpsEquity)}</td>
                        <td className="px-4 py-3">{getNumberTransformed(perpsEquity - positions.map((p) => p.position.marginUsed).reduce((a, b) => Number(a) + Number(b), 0))}</td>
                        <td className="px-4 py-3">{positions.map((p) => p.position.marginUsed).reduce((a, b) => Number(a) + Number(b), 0)}</td>
                        <td className="px-4 py-3">${getNumberTransformed(perpsEquity - positions.map((p) => p.position.marginUsed).reduce((a, b) => Number(a) + Number(b), 0))}</td>
                    </tr>
                    {
                        paginatedTrades.map((b, i) => (
                            Number(b.total) > 0 && (
                                <tr key={i}>
                                    <td className="px-4 py-3">{getAssetInfo(mids,b.coin).name}(Spot)</td>
                                    <td className="px-4 py-3">{b.total}</td>
                                    <td className="px-4 py-3">{getNumberTransformed(Number(b.total) - Number(b.hold))}</td>
                                    <td className="px-4 py-3">{getNumberTransformed(b.hold)}</td>
                                    <td className="px-4 py-3">
                                        ${getNumberTransformed(getAssetInfo(mids,b.coin).price * (Number(b.total) - Number(b.hold)))}
                                    </td>
                                </tr>
                            )
                        ))}
                </tbody>
            </TableWrapper>
            {/* PAGINATION */}
            <PaginateSelect setPage={setPage} pageCount={pageCount} number={number} setNumber={setNumber} data={balances} page={page} />
        </>
    )
};


