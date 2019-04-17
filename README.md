# API Pemilu 2019

API ini dibuat dalam bentuk turut mengawasi hasil pemilu 2019.

## Pemakaian

baseurl: `https://api-pemilu2019.herokuapp.com/`

1. data pilpres
    route: /pilpres
    query: {
        institute: string
        candidate: string
    }
    example: `https://api-pemilu2019.herokuapp.com/pilpres?institute=indikator politik indonesia&candidate=joko`
    
2. data pileg
    route: /pileg
    query: {
        institute: string
        political_party: string
    }
    example: `https://api-pemilu2019.herokuapp.com/pileg?institute=indikator politik indonesia&political_party=pdip`

## Sumber
1. https://quickcount.tempo.co
2. https://quickcount.tempo.co/pileg