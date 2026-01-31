"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (
    newParams: Record<string, string | number | undefined>,
    options: { replace?: boolean } = { replace: true }
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    if (options.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  return { updateParams };
}
