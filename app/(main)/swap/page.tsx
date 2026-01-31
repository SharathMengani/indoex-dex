"use client"
import { FeaturesSection } from "@/app/components/Swap/FeaturesSection";
import { SwapForm } from "@/app/components/Swap/SwapForm";
import { SwapIntro } from "@/app/components/Swap/SwapIntro";


export default function SwapPage() {


    return (


        <section className="py-24 dark:text-white">
            <div className="site-width-sm">
                <SwapIntro />
                <SwapForm />
                <FeaturesSection />
            </div>
        </section>

    );
};

