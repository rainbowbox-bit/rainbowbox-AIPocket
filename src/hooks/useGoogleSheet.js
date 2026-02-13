import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const useGoogleSheet = (spreadsheetId) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!spreadsheetId || spreadsheetId.includes("YOUR_SPREADSHEET_ID")) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // 使用 pub?output=xlsx 格式，這對於已發布到網路的試算表更友善並有助於解決 CORS 問題
                const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/pub?output=xlsx`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('無法存取試算表。請確認您已執行「檔案 > 共用 > 發布到網路」，並點擊了「發布」按鈕。');
                }

                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });

                let allItems = [];

                // 遍歷每個工作表 (分頁)
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    const itemsWithCategory = jsonData.map(item => ({
                        ...item,
                        Category: sheetName
                    }));

                    allItems = [...allItems, ...itemsWithCategory];
                });

                setData(allItems);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching Google Sheet:", err);
                setError(new Error('讀取資料失敗 (Failed to fetch)。這通常是因為試算表尚未「發布至網路」而被 Google 阻擋。請確認發布設定。'));
                setLoading(false);
            }
        };

        fetchData();
    }, [spreadsheetId]);

    return { data, loading, error };
};

export default useGoogleSheet;
