import  { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelDataReader({ onDataLoaded }) {
  const [members, setMembers] = useState([]);
  const [nodes, setNodes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/sample.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Processing the first sheet (Members)
      const memberSheet = workbook.Sheets[workbook.SheetNames[0]];
      const memberData = XLSX.utils.sheet_to_json(memberSheet, { header: 1 });

      const memberArray = memberData.slice(1).map((row) => ({
        start: row[1],
        end: row[2],
      }));
      setMembers(memberArray);

      // Processing the second sheet (Nodes)
      const nodeSheet = workbook.Sheets[workbook.SheetNames[1]];
      const nodeData = XLSX.utils.sheet_to_json(nodeSheet, { header: 1 });

      const nodeObject = {};
      nodeData.slice(1).forEach((row) => {
        const nodeNumber = row[0];
        const coordinates = [row[1], row[2], row[3]];
        nodeObject[nodeNumber] = coordinates;
      });
      setNodes(nodeObject);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (members.length > 0 && Object.keys(nodes).length > 0) {
      onDataLoaded({ members, nodes });
    }
  }, [members, nodes, onDataLoaded]);

  return null; // This component does not render anything
}

export default ExcelDataReader;
