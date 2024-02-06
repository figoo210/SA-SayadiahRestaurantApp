import * as XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { encode as btoa } from 'base-64';

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            let dataUrl = reader.result;
            // Strip off the data: url prefix to get just the base64-encoded bytes
            let base64 = dataUrl.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const saveFile = async (blob, fileName) => {
    const base64 = await blobToBase64(blob);
    const uri = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
    return uri;
};

export const downloadFile = async (fileUri, fileName) => {
    const { uri } = await FileSystem.downloadAsync(
        fileUri,
        FileSystem.documentDirectory + fileName
    );
    return uri; // This is the local URI to the downloaded file
};

export const shareFile = async (fileUri) => {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
        await Sharing.shareAsync(fileUri);
    } else {
        // Sharing isn't available on the current device.
        console.log('Sharing not available');
    }
};

export const convertListToExcel = async (data) => {
    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write workbook to binary string
    const wbOut = XLSX.write(workbook, {bookType:'xlsx', type:'binary'});

    // Convert binary string to Buffer/ArrayBuffer
    let buffer = new ArrayBuffer(wbOut.length);
    let view = new Uint8Array(buffer);
    for (let i = 0; i < wbOut.length; i++) view[i] = wbOut.charCodeAt(i) & 0xFF;

    // Convert ArrayBuffer to Base64
    return btoa(String.fromCharCode.apply(null, view));
};

export const convertListToCSV = async (data) => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add header if needed
    csvContent += Object.keys(data[0]).join(",") + "\r\n";

    data.forEach((item) => {
        csvContent += Object.values(item).join(",") + "\r\n";
    });

    return new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
};



export function getFilenameFromUrl(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    return pathname.substring(pathname.lastIndexOf('/') + 1);
}

export function getFilenameFromPath(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}
