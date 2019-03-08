export type Query = string;

export module Query {
  export function length(query: Query): number {
    return query.split(' ').length;
  }

  export function hits(query: Query, text: string): number {
    const terms = query.split(' ');
    return terms.reduce((memo, term) => {
      const hits = (text.match(new RegExp(term, 'g')) || []).length;
      return memo + hits;
    }, 0);
  }

  export function pageTitleIDF(query: Query): number {
    return null;
  }

  export function sectionTitleIDF(query: Query): number {
    return null;
  }

  export function tableCaptionIDF(query: Query): number {
    return null;
  }

  export function tableHeadingIDF(query: Query): number {
    return null;
  }

  export function tableBodyIDF(query: Query): number {
    return null;
  }

  export function catchAllIDF(query: Query): number {
    return null;
  }


  // export function IDF(query: Query, text: string): number {
  //   const terms = query.split(' ');
  //   if (terms.length > 1) return terms.reduce((memo, term) => {
  //     return memo + IDF(term, text);
  //   }, 0);
  //
  //   const [ term ] = terms;
  //   const textTerms = text.split(' ');
  //
  //   const tf = textTerms.filter(t => t === term).length;
  //   const idf =
  //
  // }
}