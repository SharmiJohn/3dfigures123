
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function ExcelDataReader({ onDataLoaded }) {
  const [members, setMembers] = useState([]);
  const [nodes, setNodes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/sample.xlsx', {
          responseType: 'arraybuffer',
        });

        const workbook = XLSX.read(new Uint8Array(response.data), { type: 'array' });

        // Process Members sheet
        const memberSheet = workbook.Sheets[workbook.SheetNames[0]];
        const memberData = XLSX.utils.sheet_to_json(memberSheet, { header: 1 });
        const memberArray = memberData.slice(1).map((row) => ({
          start: row[1],
          end: row[2],
        }));
        setMembers(memberArray);

        // Process Nodes sheet
        const nodeSheet = workbook.Sheets[workbook.SheetNames[1]];
        const nodeData = XLSX.utils.sheet_to_json(nodeSheet, { header: 1 });
        const nodeObject = {};
        nodeData.slice(1).forEach((row) => {
          const nodeNumber = row[0];
          const coordinates = [row[1], row[2], row[3]];
          nodeObject[nodeNumber] = coordinates;
        });
        setNodes(nodeObject);
      } catch (error) {
        console.error('Error fetching or processing the Excel file:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (members.length > 0 && Object.keys(nodes).length > 0) {
      onDataLoaded({ members, nodes });
    }
  }, [members, nodes, onDataLoaded]);

  return null;
}

export default ExcelDataReader;
