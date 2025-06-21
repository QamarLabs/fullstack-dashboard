import type React from "react";

type ResponsiveContainerProps = {};
export function ResponsiveContainer({children}: React.PropsWithChildren<ResponsiveContainerProps>) {
    return (
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
            {children}
        </div>
    );
}

type TabContainerProps = {};
export function TabContainer({children}: React.PropsWithChildren<TabContainerProps>) {
    return (
        <div className="flex flex-col w-[78vw] md:w-[78vw] lg:w-[78vw]">
            {children}
        </div>
    );
}

type TabItemsContainerProps = {};
export function TabItemsContainer({children}: React.PropsWithChildren<TabItemsContainerProps>) {
    return (
        <div className="flex flex-col w-[20vw] md:w-[25vw] lg:w-[20vw]">
            {children}
        </div>
    );
}

type FlexContainerProps = {
    classNames?: string;
};
export function FlexContainer({ children, classNames }: React.PropsWithChildren<FlexContainerProps>) {
    return (
        <div className={`flex w-[100%] bg-[pink] flex-wrap ${classNames ?? ""}`}>
            {children}
        </div>
    );
}

export function Card33({ children }: React.PropsWithChildren<any>) {
    return (
        <div className={`
            flex-col
            align-start
            xs:max-w-lg
            md:max-w-sm 
            rounded-sm overflow-hidden 
            shadow-lg bg-white 
            transition-all 
            duration-300 
            hover:shadow-xl 
            flex-[46%]
            md:flex-[30%]
            min-w-[20vw]
            m-2
            py-2
            px-2
            text-xl
            md:text-2xl
            lg:text-3xl
            font-size-[2em]
            text-left
        `}>
            {children}
        </div>
    );
}

export function Card50({ children }: React.PropsWithChildren<any>) {
    return (
        <div className={`
            flex-col
            align-start
            rounded-sm overflow-hidden 
            shadow-lg bg-white 
            transition-all 
            duration-300 
            hover:shadow-xl 
            flex-[48%]
            my-2
            mx-2
            text-xl
            md:text-2xl
            lg:text-3xl
            font-size-[2em]
            text-left
        `}>
            {children}
        </div>
    );
}

export function Card100({ children }: React.PropsWithChildren<any>) {
    return (
        <div className={`
            flex-col
            align-start
            rounded-sm overflow-hidden 
            shadow-lg bg-white 
            transition-all 
            duration-300 
            hover:shadow-xl 
            w-[100%]
            my-2
            mx-2
            py-2
            px-2
            text-xl
            md:text-2xl
            lg:text-3xl
            font-size-[2em]
            text-left
        `}>
            {children}
        </div>
    );
}

export function ColumnContainer({children}: React.PropsWithChildren<any>){
    return (
        <div className='flex flex-col'>
            {children}
        </div>
    );
}
