import { format } from 'date-fns';
import React from 'react';

type MyTableProps = {
    data: {
        poNumber: string;
        name: string;
        amount: number;
        status: "Shipped" | "Pending" | "Delivered";
        date: Date;
    }[];
}

export function MyTableRow({ children }: React.PropsWithChildren<any>) {
    return (
        <tr className="bg-gray-100 hover:bg-gray-200">
            {children}
        </tr>
    );
}

export function MyTableHeaderCell({ children }: React.PropsWithChildren<any>) {
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 text-gray-300 uppercase tracking-wider">
            {children}
        </th>
    );
}

export function MyTable({ data }: React.PropsWithChildren<MyTableProps>) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 divide-gray-700">
                <thead className="bg-gray-50 bg-gray-100">
                    <tr>
                        <MyTableHeaderCell key={0}>
                            PO Number
                        </MyTableHeaderCell>
                        <MyTableHeaderCell key={1}>
                            Name
                        </MyTableHeaderCell>
                        <MyTableHeaderCell key={2}>
                            Amount
                        </MyTableHeaderCell>
                        <MyTableHeaderCell key={3}>
                            Status
                        </MyTableHeaderCell>
                        <MyTableHeaderCell key={4}>
                            Date
                        </MyTableHeaderCell>
                    </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200 divide-gray-700">
                    {data && data.length ?
                        data.map((itm: any, idx: number) => (
                            <MyTableRow key={`data_${idx}`}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-black">
                                    #{itm.poNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-black">
                                    {itm.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-black">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(itm.amount)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`
                                        px-2 
                                        inline-flex 
                                        text-xs 
                                        leading-5 
                                        font-semibold 
                                        rounded-sm 
                                        ${itm.status === 'Shipped' ? 'bg-blue-500' : itm.status === 'Pending' ? 'bg-amber-300' : 'bg-green-500'}  
                                        ${itm.status === 'Pending' ? 'text-black' : 'text-white'}
                                    `}>
                                        {itm.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-black">
                                    {format(itm.date, 'P')}
                                </td>

                            </MyTableRow>

                        )) : null}
                </tbody>
            </table>
        </div>
    );
}