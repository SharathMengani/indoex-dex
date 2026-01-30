"use client"
import AppImage from "@/app/lib/Image"

export const StepsSection = () => {
    return (
        <section className="">
            <div className="site-width-md">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center w-full">
                        <AppImage
                            src="/images/graph.png"
                            alt="Doge Coin"
                            wrapperClassName="w-full h-full mx-auto mb-4"
                            sizes=""
                        />
                        {/* <ChartCard /> */}
                    </div>
                    <div className="max-w-150">
                        <h2 className="h2-tag font-bold font-saira text-thm">3 Steps Easy Trading</h2>
                        <p className="dark:text-[#b1b5c3] p-tag ">Rockie has a variety of features that make it the best place to start trading</p>
                        <div className="space-y-14 mt-20">
                            {steps.map((step, index) => (
                                <div className="flex gap-6">
                                    <div className="flex whitespace-nowrap justify-center items-center p-6 border-2 border-[#27A043] backdrop-blur-3xl rounded-full bg-[#101e415c] text-thm w-18 h-18 font-saira font-bold">STEP {index + 1}</div>
                                    <div>
                                        <h3 className="dark:text-white h4-tag mb-2">{step.title}</h3>
                                        <p className="dark:text-[#b1b5c3]">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const steps = [
    {
        title: "Download",
        description: "Stacks is a production-readylibrary of stackable content blocks built in React Native.",
    },
    {
        title: "Connect wallet",
        description: "Stacks is a production-readylibrary of stackable content blocks built in React Native.",
    },
    {
        title: "Start Trading",
        description: "Stacks is a production-readylibrary of stackable content blocks built in React Native.",
    },
];

