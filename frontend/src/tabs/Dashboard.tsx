import { useEffect, useState } from "react";
import { MyLineChart, MyPieChart } from "../Charts";
import { Card100, Card33, Card50, ColumnContainer, FlexContainer } from "../Containers";
import { MyPopover } from "../Popover";
import { MyTable } from "../Table";
import { CardGrowthIndicatorText, CardMainText, CardSmallText } from "../Text";
import { LoginModal, RegisterModal } from "../Modals";


type DashboardProps = {
    user: { email: string, profileImg: string } | undefined;
    setUser: (val: { email: string, profileImg: string } | undefined) => void;
}
export default function Dashboard({ user, setUser }: DashboardProps) {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <FlexContainer classNames='justify-between pl-1 pr-2'>
                <h2 className="text-left ml-2 text-2xl text-gray-900">Dashboard</h2>
                {user && (
                    <img
                        src={user?.profileImg ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s'}
                        alt={user?.email ?? "user-placeholder"}
                        className="
                            w-8 h-8       /* Default mobile size (16x16 = 64px) */
                            md:w-10 md:h-10  /* Medium devices (tablets, 20x20 = 80px) */
                            lg:w-12 lg:h-12  /* Large devices (desktops, 24x24 = 96px) */
                            rounded-full     /* Circular image */
                            object-cover     /* Ensures image covers the space without distortion */
                            border-2 border-gray-200 /* Optional: adds a light border */
                            shadow-sm        /* Optional: subtle shadow */
                            cursor-pointer
                        "
                    />
                )}
            </FlexContainer>
            <FlexContainer>
                <Card33>
                    <CardSmallText>Total Sales</CardSmallText>
                    <CardMainText value={56200} />
                    <CardGrowthIndicatorText value={0.052} />
                </Card33>
                <Card33>
                    <CardSmallText>Total Expenses</CardSmallText>
                    <CardMainText value={24500} />
                    <CardGrowthIndicatorText value={-0.018} />
                </Card33>
                <Card33>
                    <CardSmallText>Net Profit</CardSmallText>
                    <CardMainText value={31700} />
                    {/* <CardGrowthIndicatorText /> */}
                </Card33>
            </FlexContainer>
            <FlexContainer classNames="grow">
                <Card50>
                    <MyLineChart
                        xData={[200, 400, 688]}
                        yData={[1, 2, 3, 4, 5, 6, 7]}
                        width={300}
                        height={300}
                    />
                </Card50>
                <Card50>
                    <MyPieChart
                        data={[
                            { id: 0, value: 40, label: "Electronics", color: "#0d6efd" },
                            { id: 1, value: 30, label: "Furniture", color: "#75b798" },
                            { id: 2, value: 30, label: "Clothing", color: "#8540f5" }
                        ]}
                        width={200}
                        height={300}
                    />
                </Card50>
            </FlexContainer>
            <FlexContainer>
                <Card100>
                    <ColumnContainer>
                        <p className='min-w-[100%] text-gray-500'>Recent Orders</p>
                        <MyTable data={[
                            {
                                poNumber: '12345',
                                name: 'John Doe',
                                amount: 120,
                                status: 'Shipped',
                                date: new Date(2023, 6, 21)
                            },
                            {
                                poNumber: '12344',
                                name: 'Jane Smith',
                                amount: 89.99,
                                status: 'Pending',
                                date: new Date(2023, 6, 20)
                            },
                            {
                                poNumber: '12343',
                                name: 'Michael Johnson',
                                amount: 150.50,
                                status: 'Delivered',
                                date: new Date(2023, 6, 18)
                            }
                        ] as any} />
                    </ColumnContainer>
                </Card100>
            </FlexContainer>
        </>
    );
}