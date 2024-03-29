const ethAccounts = {
  "0x81005FfFd676b1422674fC763ADe81a63b4787C9": {
    ens: "mpfeffer.eth",
    avatar: "/pfp/Reamp_pfp_blue.svg",
  },
  "0x2961617a37F0405F70BFc33D93c4418c088EDfa3": {
    ens: "slytex.eth",
    avatar: "/pfp/Reamp_pfp_green.svg",
  },
  "0x0774658ca78aff2b7c1a50AAe32011FFb959EE02": {
    ens: "xaine.eth",
    avatar: "https://i.seadn.io/gcs/files/dddfd659ae4f5a75f186a109a83a8d02.png?auto=format&w=1000",
  },
  "0x4449b8e2B2068D71EA27735115aa11B4870cCA38": {
    ens: "javipark.eth",
    avatar:
      "https://i.seadn.io/gae/wyKi5YMQAAm2JqKxM5reRgYVNX1Rgr0znmLhO_Ic8dMv0J4ho-rFtihci3_teXyTW_M9ikEHv-lTRiwmIPP6uk4DFS2FGnQHYaNR?auto=format&w=384",
  },
  "0x29Bc18979B5aF84B820bDDfAc207b224c7a959DE": {
    ens: "eshita.eth",
    avatar:
      "https://i.seadn.io/gae/CrH-U-k6cT7dLRw7p2BGH3tject-eM1_LOzBdvunFH6zu-nvGvl6wpnXByO5-yr0OpCl5IBHfQp_KFhWjDFSx2Hg2LZ2b-DIWbxz?auto=format&w=384",
  },
  "0x0f9fA23209cb434b213feFd1c72a58408e216580": {
    ens: "fern.eth",
    avatar:
      "https://i.seadn.io/gae/dlhPS6n6lTfkSgBRCSZ3boi-CxnlBBQpihVOxatib0errPFtRTqgwjiZAjRUUGcqpG-iQKIKlqlXnnsD1cpsQcr5L04X1T7k70Hqfw?auto=format&w=384",
  },
  "0xAeeda01E5f0669bD66f1Ba8dC5E37b3F33C27C7f": {
    ens: "constine.eth",
    avatar:
      "https://i.seadn.io/gae/Jt486rrniuaI6AUQBAWgG4Rs6BaxPoUXDK-F5Rp2CAW5yiZyjsJ9w5H2ahmk0akJUW9Prc1KmJINU109plIMr8ITj-1AbOt9aw7hUw?auto=format&w=384",
  },
  "0x667Ea5905afDd6320607751F159bB742E8EA2126": {
    ens: "nelsonjordan.eth",
    avatar: "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x0000ce08fa224696a819877070bf378e8b131acf": {
    ens: "0000ce0.eth",
    avatar:
      "https://i.seadn.io/gae/_3lUafzSgay58szZ-2881qKh_mjBjUY2fpOIZBOh0fAcmzsaWBnqVmhqr20sHGIKU173dZINYufL5aU2fvneToTD345V9d9eyav9zA?auto=format&w=384",
  },
  "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38": {
    ens: "sweetman.eth",
    avatar:
      "https://openseauserdata.com/files/6ed7736d4fbd0464e9721f898d4247e3.svg",
  },
  "0x2B49302355d1Cb7a3f1450fA1f04627356EcABf9": {
    ens: "kevin.neaton.eth",
    avatar:
      "https://i.seadn.io/gae/tBxi0ccaET0pRWTHqH3RcoZ0wZk9yTCBmwp2OKMTh3R9v3OHwEHO6PmYON6iTzNUo0UMbi1BQjdqGhqaR5yLiO29aa0GJ60yW-hXZw?auto=format&w=384",
  },
  "0x5507dbd48a5A5bAcE8a6030e878cC4E0af147C33": {
    ens: "nis.eth",
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTAuNSAzMiAzMiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj4KPG1ldGFkYXRhPk1hZGUgd2l0aCBQaXhlbHMgdG8gU3ZnIGh0dHBzOi8vY29kZXBlbi5pby9zaHNoYXcvcGVuL1hieHZOajwvbWV0YWRhdGE+CjxwYXRoIHN0cm9rZT0iIzNlMjUxNSIgZD0iTTAgMGgyTTI5IDBoM00wIDFoMU0yIDFoMU0zMCAxaDFNMCAyaDJNMTAgMmgxM00yOSAyaDNNOSAzaDJNMTQgM2gxTTE3IDNoMU0yMiAzaDJNOCA0aDJNMTMgNGgxTTE4IDRoMU0yMyA0aDJNNyA1aDJNMTEgNWgxTTE2IDVoMU0xOSA1aDFNMjEgNWgxTTI0IDVoMk02IDZoMk0xMCA2aDFNMTIgNmgxTTE1IDZoMU0yNSA2aDJNNSA3aDJNOSA3aDFNMTYgN2gxTTIwIDdoMU0yMiA3aDFNMjYgN2gxTTUgOGgxTTcgOGgxTTExIDhoMU0xNyA4aDFNMTkgOGgxTTI2IDhoMk00IDloMk04IDloMU0yNyA5aDFNMyAxMGgyTTE0IDEwaDFNMTYgMTBoMU0yMyAxMGgxTTI3IDEwaDFNMiAxMWgyTTYgMTFoMU0xMCAxMWgxTTIxIDExaDFNMjYgMTFoMU0yOCAxMWgxTTEgMTJoMU0xNSAxMmg0TTIwIDEyaDFNMjggMTJoMU0xIDEzaDFNMyAxM2gxTTE0IDEzaDJNMTggMTNoM00yNCAxM2gxTTI4IDEzaDJNMSAxNGgxTTggMTRoMU0xMyAxNGgyTTE5IDE0aDFNMjkgMTRoMU0xIDE1aDFNNCAxNWgxTTYgMTVoMU05IDE1aDJNMTMgMTVoMU0xOCAxNWgzTTI5IDE1aDFNMSAxNmgxTTEzIDE2aDFNMTYgMTZoM00yMiAxNmgxTTI0IDE2aDFNMjYgMTZoMU0yOSAxNmgxTTEgMTdoMU04IDE3aDFNMTMgMTdoNE0xOSAxN2gxTTIyIDE3aDFNMjkgMTdoMU0xIDE4aDJNMTQgMThoMU0xOSAxOGgxTTI2IDE4aDFNMjkgMThoMU0yIDE5aDFNOCAxOWgxTTEwIDE5aDFNMTQgMTloMU0xNyAxOWgxTTI0IDE5aDFNMjggMTloMk0yIDIwaDJNOCAyMGgxTTEzIDIwaDFNMjAgMjBoMU0yMyAyMGgyTTI4IDIwaDFNMyAyMWgxTTEyIDIxaDFNMTYgMjFoMU0xOSAyMWgxTTI3IDIxaDJNMyAyMmgyTTEwIDIyaDFNMTQgMjJoMU0yMCAyMmgxTTI2IDIyaDJNNCAyM2gxTTIyIDIzaDFNMjYgMjNoMU00IDI0aDNNMTAgMjRoMU0xOSAyNGgxTTIxIDI0aDFNMjMgMjRoMU0yNSAyNGgyTTYgMjVoMk0xMiAyNWgxTTE1IDI1aDFNMjQgMjVoMk03IDI2aDNNMTIgMjZoMU0xNyAyNmgxTTIzIDI2aDJNOSAyN2gyTTE0IDI3aDFNMjAgMjdoNE0xMCAyOGgxMU0wIDI5aDNNMjkgMjloM00wIDMwaDFNMzAgMzBoMU0wIDMxaDFNMzAgMzFoMSIgLz4KPHBhdGggc3Ryb2tlPSIjNTUyZjE0IiBkPSJNMiAwaDI3TTEgMWgxTTMgMWgyN00zMSAxaDFNMiAyaDhNMjMgMmg2TTAgM2g5TTI0IDNoOE0wIDRoOE0yNSA0aDdNMCA1aDdNMjYgNWg2TTAgNmg2TTI3IDZoNU0wIDdoNU0yNyA3aDVNMCA4aDVNMjggOGg0TTAgOWg0TTI4IDloNE0wIDEwaDNNMjggMTBoNE0wIDExaDJNMjkgMTFoM00wIDEyaDFNMjkgMTJoM00wIDEzaDFNMTYgMTNoMk0zMCAxM2gyTTAgMTRoMU0xNSAxNGg0TTMwIDE0aDJNMCAxNWgxTTE0IDE1aDRNMzAgMTVoMk0wIDE2aDFNMTQgMTZoMk0zMCAxNmgyTTAgMTdoMU0zMCAxN2gyTTAgMThoMU0zMCAxOGgyTTAgMTloMk0zMCAxOWgyTTAgMjBoMk0yOSAyMGgzTTAgMjFoM00yOSAyMWgzTTAgMjJoM00yOCAyMmg0TTAgMjNoNE0yNyAyM2g1TTAgMjRoNE0yNyAyNGg1TTAgMjVoNk0yNiAyNWg2TTAgMjZoN00yNSAyNmg3TTAgMjdoOU0yNCAyN2g4TTAgMjhoMTBNMjEgMjhoMTFNMyAyOWgyNk0xIDMwaDI5TTMxIDMwaDFNMSAzMWgyOU0zMSAzMWgxIiAvPgo8cGF0aCBzdHJva2U9IiNmYWU2YmEiIGQ9Ik0xMSAzaDJNMTYgM2gxTTIwIDNoMU0xNCA0aDFNMTkgNGgxTTkgNWgxTTEyIDVoMU0xOCA1aDFNMjAgNWgxTTE0IDZoMU0xOCA2aDFNOCA3aDFNMTUgN2gxTTIxIDdoMU0yMyA3aDFNMjUgN2gxTTkgOGgxTTEzIDhoMU0yMCA4aDFNMjIgOGgxTTI0IDloMU05IDEwaDFNMTIgMTBoMU0xOCAxMGgyTTI1IDEwaDFNOSAxMWgxTTExIDExaDFNMjUgMTFoMU01IDEyaDFNMjQgMTJoMU0yNiAxMmgxTTYgMTNoMU0xMiAxM2gxTTIzIDEzaDFNNiAxNGgxTTEwIDE0aDJNMjAgMTRoMU0yMiAxNGgxTTI3IDE0aDFNMyAxNWgxTTcgMTVoMU0zIDE2aDJNMjMgMTZoMU0yOCAxNmgxTTExIDE3aDFNMjEgMTdoMU0yNCAxN2gxTTUgMThoMU04IDE4aDFNMTIgMThoMU0xNSAxOGgxTTIwIDE4aDFNMTYgMTloMU0yMyAxOWgxTTI3IDE5aDFNNiAyMGgxTTExIDIwaDFNMTcgMjBoMU0yMiAyMGgxTTQgMjFoMU04IDIxaDFNMTUgMjFoMU0xOCAyMWgxTTIwIDIxaDFNMjMgMjFoMU05IDIyaDFNMTIgMjJoMk0xNiAyMmgxTTE5IDIyaDFNMjIgMjJoMU01IDIzaDFNOSAyM2gxTTE0IDIzaDJNMTMgMjRoMU0xNyAyNGgxTTE0IDI1aDFNMTggMjVoMU0xOSAyNmgxTTIyIDI2aDFNMTYgMjdoMiIgLz4KPHBhdGggc3Ryb2tlPSIjZTk5MDRlIiBkPSJNMTMgM2gxTTE1IDNoMU0xOCAzaDJNMjEgM2gxTTEwIDRoM00xNSA0aDNNMjAgNGgzTTEwIDVoMU0xMyA1aDNNMTcgNWgxTTIyIDVoMk04IDZoMk0xMSA2aDFNMTMgNmgxTTE2IDZoMk0xOSA2aDZNNyA3aDFNMTAgN2g1TTE3IDdoM00yNCA3aDFNNiA4aDFNOCA4aDFNMTAgOGgxTTEyIDhoMU0xNCA4aDNNMTggOGgxTTIxIDhoMU0yMyA4aDNNNiA5aDJNOSA5aDE1TTI1IDloMk01IDEwaDRNMTAgMTBoMk0xMyAxMGgxTTE1IDEwaDFNMTcgMTBoMU0yMCAxMGgzTTI0IDEwaDFNMjYgMTBoMU00IDExaDJNNyAxMWgyTTEyIDExaDlNMjIgMTFoM00yNyAxMWgxTTIgMTJoM002IDEyaDlNMTkgMTJoMU0yMSAxMmgzTTI1IDEyaDFNMjcgMTJoMU0yIDEzaDFNNCAxM2gyTTcgMTNoNU0xMyAxM2gxTTIxIDEzaDJNMjUgMTNoM00yIDE0aDRNNyAxNGgxTTkgMTRoMU0xMiAxNGgxTTIxIDE0aDFNMjMgMTRoNE0yOCAxNGgxTTIgMTVoMU01IDE1aDFNOCAxNWgxTTExIDE1aDJNMjEgMTVoOE0yIDE2aDFNNSAxNmg4TTE5IDE2aDNNMjUgMTZoMU0yNyAxNmgxTTIgMTdoNk05IDE3aDJNMTIgMTdoMU0xNyAxN2gyTTIwIDE3aDFNMjMgMTdoMU0yNSAxN2g0TTMgMThoMk02IDE4aDJNOSAxOGgzTTEzIDE4aDFNMTYgMThoM00yMSAxOGg1TTI3IDE4aDJNMyAxOWg1TTkgMTloMU0xMSAxOWgzTTE1IDE5aDFNMTggMTloNU0yNSAxOWgyTTQgMjBoMk03IDIwaDFNOSAyMGgyTTEyIDIwaDFNMTQgMjBoM00xOCAyMGgyTTIxIDIwaDFNMjUgMjBoM001IDIxaDNNOSAyMWgzTTEzIDIxaDJNMTcgMjFoMU0yMSAyMWgyTTI0IDIxaDNNNSAyMmg0TTExIDIyaDFNMTUgMjJoMU0xNyAyMmgyTTIxIDIyaDFNMjMgMjJoM002IDIzaDNNMTAgMjNoNE0xNiAyM2g2TTIzIDIzaDNNNyAyNGgzTTExIDI0aDJNMTQgMjRoM00xOCAyNGgxTTIwIDI0aDFNMjIgMjRoMU0yNCAyNGgxTTggMjVoNE0xMyAyNWgxTTE2IDI1aDJNMTkgMjVoNU0xMCAyNmgyTTEzIDI2aDRNMTggMjZoMU0yMCAyNmgyTTExIDI3aDNNMTUgMjdoMU0xOCAyN2gyIiAvPgo8L3N2Zz4=",
  },
  "0x01b7baA7baA864fEF3CD1C7bc118Cc97cEdCB33f": {
    ens: "gaby.eth",
    avatar:
      "https://i.seadn.io/gae/azPOtZ3wSiQ1d40MhRcL1-KWuBP9J3EsYiTBR2IyH78-nhShJkCSwAReLgMWDJ_OJDdt3BQQPdUaprzJZtiaZ_nAumXxGFuv-YBj?auto=format&w=384",
  },
  "0xB2D6AAF0bca136C252Ec94F0f06c2489F734675f": {
    ens: "Raynharr.eth",
    avatar: "/pfp/Reamp_pfp_blue.svg",
  },
  "0xAA0dd4544Fb4aC8C706011BFa8F16638fB6409F3": {
    ens: "mattmurrs.eth",
    avatar: "/pfp/Reamp_pfp_orange.svg",
  },
  "0xDb10943768BFE537628e16B241720682F23EA242": {
    ens: "pgold.eth",
    avatar: "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x23ce90550C260DBEAd7508072590311CE4Ee96A4": {
    ens: "0x..e96A4",
    avatar:
      "https://i.seadn.io/gcs/files/d264b7a1be61c5f78190c91e99abdcd3.png?auto=format&w=384",
  },
  "0x11B4E83BC3e9605F03E2A4C34BD09567be5aeBBE": {
    ens: "malston.eth",
    avatar:
      "https://i.seadn.io/gae/UVJF5ABXey5IB5QWbRjA4eRbdhpdiAluUBX9r_MNLRaw56ngY-cxj79344ySyR1ZRq-fR0QUflGJA84bnbLmqIygZgsh4Hmtj1hfPQ?auto=format&w=384",
  },
  "0xF7B18e107eb36797f4cE36dE756630B9C30969ad": {
    ens: "Orli.eth",
    avatar:
      "https://i.seadn.io/gcs/files/2a9beceb51fe8a5879e526cd85d43015.png?auto=format&w=384",
  },
  "0xAd31e2466BD456fE1e7160Bcb303588dA5F54345": {
    ens: "0x..4345",
    avatar: "/pfp/Reamp_pfp_orange.svg",
  },
  "0x6C7c3806B3CaE601b1D99c017E4592753ba8D41e": {
    ens: "ananth.eth",
    avatar:
      "https://i.seadn.io/gae/hhFcuxgbELUEP5ynqroOCUB4vohRvTx128wtNoFJEGXwHmVTmtQCCiQxYsJk1XNpkEHyLqOb11bLu7yOgpQoUuZk02zHTLrp2HUo5TE?auto=format&w=384",
  },
  "0x8ECD3FCE6a1bd1372a0e731D15ecEA500D35cb3A": {
    ens: "Henrychatfield.Eth",
    avatar:
      "https://i.seadn.io/gcs/files/1c0b7bf951099377f8b2dea16ec0babc.jpg?auto=format&w=384",
  },
  "0x54C3283577c40eaa637D35106b7c5c6b387C5aB0": {
    ens: "elsapo.eth",
    avatar:
      "https://i.seadn.io/gcs/files/1adfb70ac3fc76a2bca0adf4dfb1334e.png?auto=format&w=384",
  },
  "0xC8F7e7436F7f967dE67825a25286A04244CBE066": {
    ens: "matiasz.eth",
    avatar: "/pfp/Reamp_pfp_blue.svg",
  },
  "0x4E33Db6008A82Ef0ab4FFd4124dD9B2d3579A523": {
    ens: "saevon.eth",
    avatar:
      "https://i.seadn.io/gae/4ZxoNRounBkKI-26zVAXh1Rz-j1j6n7b3N0HaO6cB_nIhmtUqFsCybLXH3TXIFn54zM3fkrTJAIM7Ai0JQTgVnEStzEKA2PN2zpFMg?auto=format&w=384",
  },
  "0x7b753919B953b1021A33F55671716Dc13c1eAe08": {
    ens: "cxy.eth",
    avatar:
      "https://rainbow.mypinata.cloud/ipfs/QmUZY1ZBmfDa6bgrHfuBKCxk3sDrZ5eLEovKLVQqCiz7zU",
  },
  "0xbe5DB9E33A2309898D44d9f7A6EE9229EB4d5415": {
    ens: "raeisla.eth",
    avatar:
      "https://i.seadn.io/gae/bfYtx9VqfhA4lW-25Mmx4xyyxmPuq9vrCbY0HlccTwUPSPjjzysWQbiw6c9CGVpxJh8hCT1rFXCt8mVbMrT2QbKlrZb07PaBqJxk?auto=format&w=384",
  },
  "0xdE0CBd5dF89Bb67aB804dB21e9B931bAD4200392": {
    ens: "Karmawav.eth",
    avatar:
      "https://i.seadn.io/gae/BgzIn1RZpgcClQpqb9XxvkoZAlsNBunlcT-lDeXSaRcwr1ewolCb_wWSxiCU9fwBYaShhy8pPFVtYoaIFHeC_A_HnURp8NE_MnRAWw?auto=format&w=384",
  },
  "0xd1eF2EA765f03c3696E19fCBDa511FCab42C9937": {
    ens: "nikbean.eth",
    avatar:
      "https://i.seadn.io/gae/VQdHajPyHNknrewZIgghym88MQZXzXnndIfzXEZEEqdYMVFMpXz0zLKxAqmVDquYZv2nalyu0liJZHD6FN8xUnxE9E2Ybr03TqvogCs?auto=format&w=384",
  },
  "0xeb54D707252Ee9E26E6a4073680Bf71154Ce7Ab5": {
    ens: "jzs.eth",
    avatar:
      "https://i.seadn.io/gae/eU6QyD_6oY3a_vwxyn_RdtjcYCVMCOk0HU5pGdsWBQxNM90N4Z2VAhNjmAXswu_2mcbluqSesuZPiufD1RXGOGoy9_vorvFL_o6c?w=500&auto=format",
  },
  "0x3A51A9f5C5c703802609c429EFc1f7fc78FeC0a3": {
    ens: "zarlino.eth",
    avatar:
      "https://i.seadn.io/gcs/files/ef9320ede7f0f1670e3c07f99cdbda33.png?auto=format&w=1000",
  },
  "0x2d9c9c342E892191B6c0DEFC0C85b1f00E2763a7": {
    ens: "tulengua.eth",
    avatar:
      "https://arweave.net/h1m-4KPSBbsMr8MTu9JEFxHBdrO-u5ZgKS154vUk60c",
  },
  "0x679Bb0B9643f5C85a3663e37bD5C89B97F3ef7c8": {
    ens: "alanlili.eth",
    avatar:
      "https://arweave.net/h1m-4KPSBbsMr8MTu9JEFxHBdrO-u5ZgKS154vUk60c",
  },
  "0x87C59E0b19e358190c5Fd576E61fE82e0b64141A": {
    ens: "remcycles.eth",
    avatar:
      "https://rainbow.mypinata.cloud/ipfs/QmV4WVkQmMCtuoh1ahhQ3ACGL7e2x3sKJbEZy7kKBj9pBZ",
  },
  "0x089036a0835C6cF82e7fC42e9e95DfE05e110c81": {
    ens: "xcelencia.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x4Aca3d058D45f851CB0cb55537438daA404405F7": {
    ens: "cahen.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xbEd53356e0fE059A9E9808EA4309CfaF4A1Be9B2": {
    ens: "fabialonso.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xE99c3Ecbc68868602CF558325BC6ab6A9807dFa9": {
    ens: "betapetra.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xaE8b5F6638a8F3C76E2F4656cfd2B0b523307302": {
    ens: "hingokirani.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xC8Bf177D6F4D13090f6593953633a604E69076EF": {
    ens: "worldli.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x3024b3BC94F63E058D57C9Bd89aD3289c69401dd": {
    ens: "fblauer.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x5438d25a004117fB8cd8594514e5A80706a1137C": {
    ens: "5868.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x033b83d255d5BBa6E82a14Fe48135634c85e2069": {
    ens: "evand.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x0a17A9EC3d10B3209d8f7dF2e094043cC4Ff9916": {
    ens: "1Universe.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xDB95FB67fD66f91Fcc268EF0Db381721aF6e33A5": {
    ens: "badsociety.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x0000ce08fa224696a819877070bf378e8b131acf": {
    ens: "0x..1acf",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x23ce90550C260DBEAd7508072590311CE4Ee96A4": {
    ens: "0x..96a4",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xAd31e2466BD456fE1e7160Bcb303588dA5F54345": {
    ens: "0x..4345",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x445bD40e08D6E5cb88AdAc5B705acA38df5a4F46": {
    ens: "0x..4F46",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x84a88408fD791a4a09a474eaf59e8aC310D536AF": {
    ens: "0x..36AF",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xff88c9c03Bf819c9D3090DdB55727486cC70b832": {
    ens: "0x..b832",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xC7Ba43efF6484a69Bcf2d03509b7Eb1584b27020": {
    ens: "0x..7020",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x7933231775dEc3f3c80039DEbd7E3afD8A81f674": {
    ens: "0x..f674",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x2Aa1666138898073a7fA5220D300E05Ef8D11292": {
    ens: "raptographer.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xD77611f584622337142f7b77d0eD9978EEA929B6": {
    ens: "0x..29B6",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x705A42EcC5dF243BF9298f1D091b89761522a796": {
    ens: "0xjim.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x024d644b055aDa775Bb20A53C5d90A70698dff99": {
    ens: "drojkind.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x24a0e4EE348f33252e83fE1e824499381dd21aa9": {
    ens: "0x..1aa9",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xE1a87C087227Af0855F7dA73e7472Bd7A7b187A6": {
    ens: "0x..87A6",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xa479C39D509A0965b53B961758932a0C2c975104": {
    ens: "lolsure.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x73d9B8C8A2601Fac9BE5b388A665cAe5DCD6ED18": {
    ens: "andrewcolabella.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xdBAf6F4434a3b60B7461A0ae50c2083fE19d5CDb": {
    ens: "dadabots.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x01B4FAe0b350aF95D1bD8FB1341D9dcE1a87A453": {
    ens: "sebas.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x1b90cC907694E8DBb920a7E12231677aFfF786Ed": {
    ens: "ibeemelissae.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x0A032Cd1433DD23616B94F925CB6c86db6b7f073": {
    ens: "0x..f0f3",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x46642e15d77BbE0bDfcfbf348C38b06153D16049": {
    ens: "glbkst.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x086cE37549fee88e10A217E3C2478163177A8273": {
    ens: "VoxClub.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x770d0A50f87298459C13D570011fFae3C045C05E": {
    ens: "braceish.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x039E84E7041A029c854B7760B26A5A93A3Aa9c94": {
    ens: "abelow.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x03b4016f7E58f78E52329d410486C4c5aE5dfc8C": {
    ens: "darrenli.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x9E7E7E54e43b1E5f00a5f350B16C37346438872b": {
    ens: "y0han.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xBDf83EB46c6a52AF8b67bAa2F72AFFE71c751e5c": {
    ens: "cssis.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x9F098B02634D846E4f466Ae084Af549b9c9ecF49": {
    ens: "Blockshane.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x35224C95aa3E53a30cc3F6f64540618892a568D7": {
    ens: "adrienstern.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xbf46D2161045251cB97D0B41929bc1D36044E1a0": {
    ens: "Dominosmusic.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x80E451777dCD4E4a589a038A61b1dca72d718045": {
    ens: "danfowler.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x1A1c37C145a1EaB58C43F003EBB55C18083b5987": {
    ens: "davidtphung.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x29185eB8cfD22Aa719529217bFbadE61677e0Ad2": {
    ens: "joseacabrerav.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x48D6aaeFc242078FF5f5Fea63E71B98Dd5068818": {
    ens: "househead.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x7De19fF74dBb2F208Fb3D8a19eBE7995Cef8345c": {
    ens: "aaronsvilla.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0xd35D60B1746cAEc2289c892EAC7351D66d63455B": {
    ens: "crittie.eth",
    avatar:
      "/pfp/Reamp_pfp_yellowpink.svg",
  },
  "0x32ec773ed7B5a54D1f0ac77944caF76ED30E6b86": {
    ens: "musicben.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0x847dBDEF6B03AAc8be266598928Ca0d994aaA400": {
    ens: "markredito.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },
  "0xcbFFa910Ee7546AF659B82E4E7ed54cF8524Aab6": {
    ens: "polarzero.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },  
  "0xB9635e921D8F08b0aAb00a94647c436f91138Fe9": {
    ens: "0x..8Fe9.eth",
    avatar:
      "/pfp/Reamp_pfp_blue.svg",
  },  
  
};
export default ethAccounts;
