import { Card100, Card33, FlexContainer } from "../Containers";
import { CardMainText, CardSmallText } from "../Text";


export default function Settings() {
    const users = [
        { name: "Bob", moneyInAccount: 2500 },
        { name: "Tom", moneyInAccount: 1265 },
        { name: "John", moneyInAccount: 10000 },
        { name: "Larry", moneyInAccount: 112500 },
        { name: "Tim", moneyInAccount: 112605 },
        { name: "Justin", moneyInAccount: 1530000 },
    ]
    return (
        <>
            <FlexContainer>
                <Card100>
                    <p className='min-w-[100%] text-gray-900'>Users</p>
                </Card100>
            </FlexContainer>
            <FlexContainer>
                {users && users.length ? users.map((u, idx) => (
                    <Card33 key={idx}>
                        <CardSmallText>{u.name}</CardSmallText>
                        <CardMainText value={u.moneyInAccount} />
                    </Card33>
                )) : null}
            </FlexContainer>
        </>
    );
}