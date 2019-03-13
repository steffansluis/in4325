import { Query } from '.';

import * as Utils from '../utils';

export type Table = {
  title: string[]
  numCols: number,
  numericColumns: number[]
  pgTitle: string
  numDataRows: number
  secondTitle: string,
  numHeaderRows: number
  caption: string,
  data: string[][]
};

export type TableTermCounts = {
  pageTitle: Utils.TermCounts
  sectionTitle: Utils.TermCounts
  tableCaption: Utils.TermCounts
  tableHeading: Utils.TermCounts
  tableBody: Utils.TermCounts
  catchAll  : Utils.TermCounts
}

export module Table {
  export function bodyText(table: Table): string {
    return table.data.reduce((memo, row) => {
      return [
        ...memo,
        row.join(' ')
      ];
    }, [ table.title.join(' ') ]).join('\n');
  }

  // TODO: Does this include the header?
  export function leftColumnHits(table: Table, query: Query): number {
    const column = table.data.reduce((memo, row) => {
      return [
        ...memo,
        row[0]
      ]
    }, []);

    const text = column.join('\n');
    return Query.hits(query, text);
  }

  // TODO: Does this include the header?
  export function secondLeftColumnHits(table: Table, query: Query): number {
    const column = table.data.reduce((memo, row) => {
      return [
        ...memo,
        row[1]
      ]
    }, []);

    const text = column.join('\n');
    return Query.hits(query, text);
  }

  export function bodyHits(table: Table, query: Query): number {
    const text = bodyText(table);
    return Query.hits(query, text);
  }

  export function termCounts(table: Table): TableTermCounts {
    const pageTitle = table.pgTitle;
    const sectionTitle = table.secondTitle;
    const tableCaption = table.caption;
    const tableHeading = table.title.join(' ');
    const tableBody = bodyText(table);
    const catchAll = [ pageTitle, sectionTitle, tableCaption, tableBody ].join('\n');

    return {
      pageTitle: Utils.countTerms(pageTitle),
      sectionTitle: Utils.countTerms(sectionTitle),
      tableCaption: Utils.countTerms(tableCaption),
      tableHeading: Utils.countTerms(tableHeading),
      tableBody: Utils.countTerms(tableBody),
      catchAll: Utils.countTerms(catchAll),
    };
  }
}

// 26,2008 olympic gold medal winners,table-0001-249,6,7,0,65,54,3659,0.25,0.00038030043734550294,0,0,13,-0.19668521988918414,0.0,0.2857142857142857,100,1.598546991573088e-11,30.568963762160973,23.5556061678327,31.170109829929867,30.07549105098942,31.107367016003074,31.170109829929867,1.0,12.6746047422,0.158432559277,0.724063231539,0.878313951697,46.1380892231,0.65911556033,0.847156406132,0.16269784336399212,4.60555954177651,0.027091526716332415,0.2025233764978797,0.1458407513661945,3.5301585340552806,0.020765638435619297,0.12610537699222918,5,1

// "table-0001-249": {
//   "title": [
//     "Athlete",
//     "Nation",
//     "Total",
//     "Gold",
//     "Silver",
//     "Bronze",
//     "Events"
//   ],
//   "numCols": 7,
//   "numericColumns": [
//     2,
//     3,
//     4,
//     5
//   ],
//   "pgTitle": "Auburn Tigers swimming and diving",
//   "numDataRows": 6,
//   "secondTitle": "Summer Olympic Games Beijing 2008",
//   "numHeaderRows": 1,
//   "caption": "Summer Olympic Games Beijing 2008",
//   "data": [
//     [
//       "[Fr\u00e9d\u00e9rick_Bousquet|Fr\u00e9d\u00e9rick Bousquet]",
//       "[France|FRA]",
//       "1",
//       "0",
//       "1",
//       "0",
//       "Silver Medal in 400m Freestyle relay"
//     ],
//     [
//       "[C\u00e9sar_Cielo|C\u00e9sar Cielo Filho]",
//       "[Brazil|BRA]",
//       "2",
//       "1",
//       "0",
//       "1",
//       "Gold Medal in 50m Freestyle and Bronze Medal for 100m Freestyle"
//     ],
//     [
//       "[Kirsty_Coventry|Kirsty Coventry]",
//       "[Zimbabwe|ZIM]",
//       "4",
//       "1",
//       "3",
//       "0",
//       "Gold Medal in 200m backstroke, Silver Medal in 100m basckstroke, 200m Medley and 400m Medley."
//     ],
//     [
//       "[Mark_Gangloff|Mark Gangloff]",
//       "[United_States|USA]",
//       "1",
//       "1",
//       "0",
//       "0",
//       "Gold Medal in 400m Medley Relay"
//     ],
//     [
//       "[Margaret_Hoelzer|Margaret Hoelzer]",
//       "[United_States|USA]",
//       "3",
//       "0",
//       "2",
//       "1",
//       "Silver Medal in 200m backstroke, 400m Medley, Bronze Medal in 100m backstroke"
//     ],
//     [
//       "[Matt_Targett|Matt Targett]",
//       "[Australia|AUS]",
//       "2",
//       "0",
//       "1",
//       "1",
//       "Silver Medal in 400m Medley Relay, Bronze Medal in 400m freestyle relay"
//     ]
//   ]
// },