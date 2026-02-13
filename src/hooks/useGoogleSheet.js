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
                const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch Spreadsheet. Make sure it is public (Published to web).');
                }

                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });

                let allItems = [];

                // Iterate through each sheet (tab)
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    // Convert sheet to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    // Add category info to each row based on sheet name
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
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [spreadsheetId]);

    return { data, loading, error };
};

export default useGoogleSheet;
