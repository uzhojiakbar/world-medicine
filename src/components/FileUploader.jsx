import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
    const [excelData, setExcelData] = useState([]);
    const [error, setError] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("Please upload a valid Excel file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(json);
                setError(null);
            } catch (err) {
                setError("Error parsing Excel file. Make sure it's a valid file.");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const sendDataToBackend = async () => {
        try {
            const response = await fetch('/api/save-excel-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: excelData }),
            });
            const result = await response.json();
            console.log('Backend Response:', result);
        } catch (err) {
            console.error('Error sending data to backend:', err);
        }
    };

    console.log(excelData)
    return (
        <div>
            <h1>Excel Uploader</h1>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
                onClick={sendDataToBackend}
                disabled={!excelData.length}
            >
                Send to Backend
            </button>

            <div>
                <h2>Preview Data</h2>
                {excelData.length > 0 ? (
                    <table  border="1">
                        <thead>
                        <tr>
                            {Object.keys(excelData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        </div>
    );
};

export default ExcelUploader;
