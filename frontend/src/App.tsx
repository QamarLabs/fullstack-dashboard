import { useEffect, useState } from 'react';
import './App.css';
import { TabContainer, TabItemsContainer } from './Containers';
import { ListItem } from './Text';
import Dashboard from './tabs/Dashboard';
import Users from './tabs/Users';
import Settings from './tabs/Settings';
import { AiOutlineDashboard, AiOutlineLogin, AiOutlineSetting, AiOutlineUsergroupAdd, AiOutlineUserAdd, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { LoginModal, RegisterModal } from './Modals';



function App() {
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const [tabSelected, setTabSelected] = useState<"dashboard" | "users" | "settings">("dashboard");

    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [userInLocalStorage, setUserInLocalStorage] = useState<{email: string, profileImg: string} | undefined>(undefined);

    useEffect(() => {
        if (localStorage.getItem('user') && !userInLocalStorage)
            setUserInLocalStorage(JSON.parse(localStorage.getItem('user')!));
        
        if(!localStorage.getItem('user') && userInLocalStorage)
            localStorage.setItem('user', JSON.stringify(userInLocalStorage));
    }, [userInLocalStorage])

    const handleTabSelected = (val: string) => {
        setTabSelected(val as "dashboard" | "users" | "settings");
    }

    const displayTabSelect = () => {

        if (tabSelected === "dashboard")
            return <Dashboard user={userInLocalStorage} setUser={setUserInLocalStorage} />;

        if (tabSelected === "users")
            return <Users />;

        if (tabSelected === "settings")
            return <Settings />;

        return null;
    }

    return (
        <>
            <div className='flex min-h-[100vh] max-w-[100vw] p-0 m-3 rounded-sm overflow-hidden shadow-lg bg-white '>
                <TabItemsContainer>
                    <button className='info-button center-icon w-[3em]' type='button' onClick={() => setShowNavbar(!showNavbar)}>
                        <AiOutlineMenu />
                    </button>
                    {showNavbar && (

                        <ul className="flex flex-col justify-start h-100 p-0">
                            <ListItem
                                keyValue={"dashboard"}
                                setKeyValue={handleTabSelected}
                                icon={<AiOutlineDashboard />}
                            >
                                Dashboard
                            </ListItem>
                            <ListItem
                                keyValue={"users"}
                                setKeyValue={handleTabSelected}
                                icon={<AiOutlineUsergroupAdd />}
                            >
                                Users
                            </ListItem>
                            <ListItem
                                keyValue={"settings"}
                                setKeyValue={handleTabSelected}
                                icon={<AiOutlineSetting />}
                            >
                                Settings
                            </ListItem>
                            {!userInLocalStorage ? (
                                <>
                                    <ListItem
                                        keyValue={"login"}
                                        setKeyValue={(_: string) => setOpenLoginModal(!openLoginModal)}
                                        icon={<AiOutlineLogin />}
                                    >
                                        Login
                                    </ListItem>
                                    <ListItem
                                        keyValue={"register"}
                                        setKeyValue={(_: string) => setOpenRegisterModal(!openLoginModal)}
                                        icon={<AiOutlineUserAdd />}
                                    >
                                        Register
                                    </ListItem>
                                </>
                            ) : (
                                <ListItem
                                    keyValue={"logout"}
                                    setKeyValue={(_: string) => {
                                        setUserInLocalStorage(undefined);
                                        localStorage.removeItem('user');
                                    }}
                                    icon={<AiOutlineLogout />}
                                >
                                    Logout
                                </ListItem>
                            )}
                        </ul>
                    )}
                </TabItemsContainer>
                <TabContainer>
                    {displayTabSelect()}
                </TabContainer>

            </div>
            <LoginModal openModal={openLoginModal} setOpenModal={setOpenLoginModal} setUser={setUserInLocalStorage}/>
            <RegisterModal openModal={openRegisterModal} setOpenModal={setOpenRegisterModal} setUser={setUserInLocalStorage}/>
        </>
    );
}

export default App;