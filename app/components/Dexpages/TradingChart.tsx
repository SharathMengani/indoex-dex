"use client";
import { useEffect, useRef, useState } from "react";
import { widget } from "../../../public/static/charting_library"; // Adjust path
import { SimpleDatafeed } from "./SampleDataFeed";
import { AbcDexLoader } from "./OrderBook";


interface TradingChartProps {
    pair: string;
}

export default function TradingChart({ pair }: TradingChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tvWidgetRef = useRef<any>(null);

    // Initialize TradingView widget once per pair
    useEffect(() => {
        if (!chartContainerRef.current) return;
        setIsLoading(true);
        // Cleanup previous widget if switching pair
        if (tvWidgetRef.current?.remove) {
            try {
                tvWidgetRef.current.remove();
            } catch (e) { }
            tvWidgetRef.current = null;
        }

        const [fsym, tsym] = pair.split("_");
        const datafeed = new SimpleDatafeed({ fsym, tsym });

        const toolbarColor = "#000";

        const widgetOptions: any = {
            symbol: pair,
            datafeed,
            container: chartContainerRef.current,
            library_path: "/static/charting_library/",
            locale: "en",
            interval: "5",
            fullscreen: false,
            autosize: true,
            theme: "Dark",
            toolbar_bg: toolbarColor,
            disabled_features: [
                "use_localstorage_for_settings",
                "snapshot_trading_drawings",
                "countdown",
                "header_saveload",
                "header_settings",
                "symbol_info",
                "caption_buttons_text_if_possible",
                "header_symbol_search",
                "symbol_search_hot_key",
                "header_toolbar",
                "edit_buttons_in_legend",
                "context_menus",
                "control_bar",
                "legend_context_menu",
            ],
            enabled_features: [
                "study_templates",
                "legend_context_menu",
                "dont_show_boolean_study_arguments",
                "hide_last_na_study_output",
                "move_logo_to_main_pane",
                "same_data_requery",
                "disable_resolution_rebuild",
            ],
            loading_screen: {
                backgroundColor: toolbarColor,
                foregroundColor: toolbarColor,
            },
            overrides: {
                "paneProperties.background": toolbarColor,
                "paneProperties.backgroundType": "solid",
                "paneProperties.vertGridProperties.color": "#1e2329",
                "paneProperties.horzGridProperties.color": "#1e2329",
                "scalesProperties.backgroundColor": toolbarColor,
                "scalesProperties.lineColor": "#2b3139",
                "scalesProperties.textColor": "#fff", // text green
                "mainSeriesProperties.candleStyle.upColor": "#2bc287",
                "mainSeriesProperties.candleStyle.downColor": "#f74b60",
                "mainSeriesProperties.candleStyle.drawWick": true,
                "mainSeriesProperties.candleStyle.drawBorder": true,
                "mainSeriesProperties.candleStyle.borderUpColor": "#2bc287",
                "mainSeriesProperties.candleStyle.borderDownColor": "#f74b60",
                "mainSeriesProperties.candleStyle.wickUpColor": "#2bc287",
                "mainSeriesProperties.candleStyle.wickDownColor": "#f74b60",
                "mainSeriesProperties.areaStyle.color1": "#16a34a33",
                "mainSeriesProperties.areaStyle.color2": "#16a34a00",
                "mainSeriesProperties.areaStyle.linecolor": "#16a34a",
                "mainSeriesProperties.areaStyle.linewidth": 2,
                "mainSeriesProperties.lineStyle.color": "#2bc287",
                "mainSeriesProperties.lineStyle.linewidth": 2,
                "mainSeriesProperties.statusViewStyle.symbolTextSource": "ticker",
                volumePaneSize: "medium",
                "paneProperties.topMargin": 10,
                "paneProperties.bottomMargin": 10,
            },
        };

        const tvWidget = new widget(widgetOptions);
        tvWidgetRef.current = tvWidget;

        tvWidget.onChartReady(() => {
            const chart = tvWidget.activeChart();
            chart.setChartType(1); // Candle chart
            chart.createStudy("Volume", false, false);
            setIsLoading(false);
        });

        return () => {
            try {
                tvWidgetRef.current?.remove?.();
            } catch (e) { }
            tvWidgetRef.current = null;
        };
    }, [pair]);


    return (
        <div className="relative h-147.5 w-full">
            <div
                id="tv_chart_container"
                ref={chartContainerRef} className="h-147.5"
                style={{ width: "100%" }} // Ensure parent has height
            />
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center
        bg-black/60 backdrop-blur-sm animate-fadeOut">
                    <AbcDexLoader />
                </div>
            )}

        </div>
    );
}

export const timeframes = [
    { label: "1m", value: "1" },
    { label: "5m", value: "5" },
    { label: "15m", value: "15" },
    { label: "30m", value: "30" },
    { label: "1h", value: "60" },
    { label: "4h", value: "240" },
    { label: "1D", value: "D" },
];