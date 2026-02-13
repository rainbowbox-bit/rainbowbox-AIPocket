import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useGoogleSheet = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url || url.includes("2PACX-")) {
            // 如果 url 已經是正確的發布連結，則繼續執行
        } else if (url.includes("YOUR_")) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                Papa.parse(url, {
                    download: true,
                    header: true,
                    complete: (results) => {
                        // 這裡支援兩種模式：
                        // 1. 如果 Sheet 裡有 Category 欄位，就用它
                        // 2. 如果沒有，我們可以考慮之後擴充。
                        // 目前先採用 CSV 最穩定的讀取方式
                        setData(results.data);
                        setLoading(false);
                    },
                    error: (err) => {
                        console.error("PapaParse Error:", err);
                        setError(new Error("無法解析 CSV 資料，請確認試算表已發布為 CSV 格式。"));
                        setLoading(false);
                    }
                });
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useGoogleSheet;
