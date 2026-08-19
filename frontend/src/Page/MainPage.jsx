import "./MainPage.css";
import {useState, useEffect,useRef} from "react";
import {Link,Outlet} from "react-router-dom";
import {openDB} from "idb";

function MainPage() {

    const [accounts, setAccounts] = useState([]);

    const openPasswordDB = async () => {

        return await openDB("PasswordDB", 1, {

            upgrade(db) {

                if (!db.objectStoreNames.contains("accounts")) {

                    db.createObjectStore("accounts", {
                        keyPath: "id"
                    });

                }
            }
        });
    };

    // =============================
    // 프로그램 시작 시 DB 불러오기
    // =============================
    useEffect(() => {

        const loadAccounts = async () => {

            const db = await openPasswordDB();

            const data = await db.getAll("accounts");

            setAccounts(data);
        };

        loadAccounts();

    }, []);


    // =============================
    // Save 버튼
    // =============================
    const saveAccounts = async () => {

        const db = await openPasswordDB();

        for (const account of accounts) {

            await db.put(
                "accounts",
                account
            );

        }

        const jsonData = JSON.stringify(
            accounts,
            null,
            2
        );

        const blob = new Blob(
            [jsonData],
            {
                type: "application/json"
            }
        );

        const url = URL.createObjectURL(blob);

        // 다운로드용 a 태그 생성
        const link = document.createElement("a");

        link.href = url;
        link.download = "accounts_backup.json";

        // 파일 다운로드
        link.click();

        // 임시 주소 제거
        URL.revokeObjectURL(url);

        alert("저장 완료");
    };


    const fileInputRef = useRef(null);

    const importAccounts = async (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const text = await file.text();

        const data = JSON.parse(text);

        const db = await openPasswordDB();

        for (const account of data) {
            await db.put(
                "accounts",
                account
            );
        }

        setAccounts(data);

        alert("백업 복원 완료");
    };


    const openBackupFile = () => {

        fileInputRef.current.click();
    };

    return (
        <div className="d-flex mainpage-scope" id="wrapper">
            {/* Sidebar */}
            <aside className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">PASSWORD DATABASE</div>
                <nav className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/main">DashBoard</Link>
                </nav>
            </aside>

            {/* Page */}
            <main id="page-content-wrapper">
                {/* Top navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button className="btn btn-primary" id="sidebarToggle" onClick={saveAccounts}>
                            Save
                        </button>

                        <button className="btn btn-primary" id="sidebarToggle" onClick={openBackupFile}>
                            Load
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={importAccounts}
                            style={{ display: "none" }}
                        />
                    </div>
                </nav>

                {/* Page Content */}
                <section className="container-fluid">
                   <Outlet
                       context={{
                       accounts,
                       setAccounts
                   }}/>
                </section>
            </main>
        </div>
    );
}

export default MainPage;