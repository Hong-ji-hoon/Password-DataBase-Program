import { useOutletContext } from "react-router-dom";
import "./DashBoard.css";

function DashBoard() {
    const {accounts, setAccounts} = useOutletContext();

    // + 버튼 눌렀을 때
    const addAccount = () => {



        const newAccount = {
            id: Date.now(),
            site: "",
            userId: "",
            password: ""
        };

        setAccounts([
            ...accounts,
            newAccount
        ]);
    };

    // 내용 수정
    const changeAccount = (id, field, value) => {
        setAccounts(
            accounts.map(account =>
                account.id === id
                    ? {
                        ...account,
                        [field]: value
                    }
                    : account
            )
        );
    };

    return (
        <div>
            <table className="table table-hover">

                <thead>
                <tr>
                    <th scope="col">유형</th>
                    <th scope="col">사이트</th>
                    <th scope="col">아이디</th>
                    <th scope="col">비밀번호</th>
                </tr>
                </thead>


                <tbody>

                {accounts.map((account, index) => (

                    <tr key={account.id}>

                        <th scope="row">
                            {index + 1}
                        </th>

                        <td>
                            <input
                                type="text"
                                value={account.site}
                                onChange={(e) =>
                                    changeAccount(
                                        account.id,
                                        "site",
                                        e.target.value
                                    )
                                }
                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                value={account.userId}
                                onChange={(e) =>
                                    changeAccount(
                                        account.id,
                                        "userId",
                                        e.target.value
                                    )
                                }
                            />
                        </td>

                        <td>
                            <input
                                type="text"
                                value={account.password}
                                onChange={(e) =>
                                    changeAccount(
                                        account.id,
                                        "password",
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>

            <div className="button-area">
                <button className="add-button" onClick={addAccount}>+</button>
            </div>

        </div>
    );
}

export default DashBoard;