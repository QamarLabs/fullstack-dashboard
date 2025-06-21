import { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

type ListItemProps = {
    keyValue: string;
    setKeyValue: (val: string) => void;
    icon: React.ReactNode;
};
export function ListItem({ children, keyValue, setKeyValue, icon }: React.PropsWithChildren<ListItemProps>) {
    return (
        <li
            className='p-2 text-gray-900 hover:bg-gray-200 hover:cursor-pointer transition delay-150 duration-500 ease-in-out flex justify-center sm:justify-start align-center'
            onClick={e => {
                e.stopPropagation();
                setKeyValue(keyValue);
            }}
        >
            <span className='inline mr-2 mt-1'>
                {icon}
            </span>
            <span className=' hidden sm:inline text-sm md:text-md'>
                {children}
            </span>
        </li>
    );
}

type CardMainTextProps = {
    value: number;
}
export function CardMainText({ value }: React.PropsWithChildren<CardMainTextProps>) {
    const [convertedValue, setConvertedValue] = useState<string>('');
    useEffect(() => {
        const formattedAmount = value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        setConvertedValue(formattedAmount);
    }, [value]);

    return (
        <h2 className='font-bold text-gray-900'>
            {convertedValue}
        </h2>
    );
}

export function CardSmallText({ children }: React.PropsWithChildren<any>) {
    return (
        <p className='text-xs  text-gray-900 font-light'>
            {children}
        </p>
    );
}


type CardGrowthIndicatorTextProps = {
    value: number;
};
export function CardGrowthIndicatorText({ value }: CardGrowthIndicatorTextProps) {
    const [growth, setGrowth] = useState<string>('');
    const [showUp, setShowUp] = useState<boolean>(false);
    useEffect(() => {
        const formattedAmount = Math.abs(value).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        setShowUp(value > 0);
        setGrowth(formattedAmount);

    }, [value]);

    return (
        <p className={`flex align-center w-[5em] text-[0.65rem] font-light ${showUp ? 'text-green-500' : 'text-red-500'}`}>
            {showUp ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            {growth}
        </p>
    );
}