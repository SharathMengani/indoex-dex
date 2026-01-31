export function SwapBoxSkeleton() {
    return (
        <div className="relative space-y-4 animate-pulse mb-4">
            {/* FROM */}
            <div className="relative space-y-4">
                <div className="rounded-xl border dark:border-[#232323] border-black/12 dark:bg-[#232323] bg-black/12 p-4 space-y-3">
                    <div className="h-4 w-16 bg-[white]/12 rounded" />
                    <div className="flex items-center justify-between">
                        <div className="h-10 w-32 bg-[white]/12 rounded" />
                        <div className="h-10 w-24 bg-[white]/12 rounded" />
                    </div>
                </div>

                {/* SWAP BUTTON */}
                <div className="flex justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 rounded-full dark:bg-[#232323] bg-black/12 border-2 dark:border-[#232323] border-black/12" />
                </div>

                {/* TO */}
                <div className="rounded-xl border dark:border-[#232323] border-black/12 dark:bg-[#232323] bg-black/12 p-4 space-y-3">
                    <div className="h-4 w-12 bg-[white]/12 rounded" />
                    <div className="flex items-center justify-between">
                        <div className="h-10 w-32 bg-[white]/12 rounded" />
                        <div className="h-10 w-24 bg-[white]/12 rounded" />
                    </div>
                </div>
            </div>
            <div className="rounded-xl border dark:border-[#232323] border-black/12 dark:bg-[#232323] bg-black/12 p-4 space-y-3">
                <div className="h-4 w-12 bg-[white]/12 rounded" />
                <div className="flex items-center justify-between">
                    <div className="h-10 w-32 bg-[white]/12 rounded" />
                    <div className="h-10 w-24 bg-[white]/12 rounded" />
                </div>
            </div>
        </div>
    );
}
export function QuoteSkeleton() {
    return (
        <div className="rounded-xl p-4 border bg-[white]/12 dark:border-[#232323] border-black/12 animate-pulse">
            {/* TAG */}
            <div className="mb-3">
                <div className="h-5 w-24 rounded-full bg-[white]/12" />
            </div>

            {/* TOP ROW */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-7 w-32 bg-[white]/12 rounded mb-2" />
                    <div className="h-4 w-20 bg-[white]/12 rounded" />
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[white]/12" />
                    <div className="h-4 w-24 bg-[white]/12 rounded" />
                </div>
            </div>

            {/* RATE */}
            <div className="mt-4 flex items-center justify-between">
                <div className="h-4 w-48 bg-[white]/12 rounded" />
                <div className="flex gap-3">
                    <div className="h-4 w-14 bg-[white]/12 rounded" />
                    <div className="h-4 w-10 bg-[white]/12 rounded" />
                </div>
            </div>
        </div>
    );
}