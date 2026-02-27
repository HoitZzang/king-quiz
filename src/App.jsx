import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const characters = {
  hongwi: {
    name: "이홍위 (단종)",
    emoji: "👑",
    color: "from-blue-500 to-indigo-700",
    accent: "#818cf8",
    img: "https://i.imgur.com/F2j5ncv.jpg",
    desc: "모든 것을 잃었지만 끝내 타인을 위해 자신을 내어주는 사람입니다. 겉으론 냉정해 보여도 내면 깊이 상처를 품고 있으며, 고독 속에서 진짜 자신을 찾아갑니다.",
    traits: ["깊은 내면의 상처", "타인을 위한 희생", "조용한 결단력", "고독을 견디는 힘"],
    quote: "\"나약한 내가 어찌 사람을 지킬 수 있겠느냐\" — 하지만 결국 모두를 지켜냈다.",
  },
  heungdo: {
    name: "엄흥도",
    emoji: "🏡",
    color: "from-amber-500 to-orange-700",
    accent: "#fb923c",
    img: "https://i.imgur.com/Xqtad4Y.jpg",
    desc: "현실적이고 투덜거리지만, 정작 중요한 순간엔 누구보다 먼저 몸을 던지는 사람입니다. 가족과 이웃을 지키는 것이 삶의 전부이며, 의리와 책임감이 본능처럼 새겨져 있습니다.",
    traits: ["현실적 책임감", "가족을 향한 헌신", "투박한 따뜻함", "위기 속 진가 발휘"],
    quote: "\"아들 대신 내가 맞겠습니다. 제발 아들을 풀어주시오.\"",
  },
  hanmyonghoe: {
    name: "한명회",
    emoji: "🪄",
    color: "from-slate-500 to-gray-800",
    accent: "#94a3b8",
    img: "https://i.imgur.com/KSOosTi.jpg",
    desc: "모든 상황을 몇 수 앞서 읽고 철저히 계산하는 사람입니다. 감정보다 논리를, 의리보다 실리를 택하며, 자신이 옳다고 믿는 질서를 위해서라면 어떤 수단도 마다하지 않습니다.",
    traits: ["냉철한 전략가", "압도적인 위압감", "철저한 실리주의", "치밀한 계획성"],
    quote: "\"이홍위는 달포를 넘기지 못할 것이다.\" — 그는 모든 것을 계산했다.",
  },
  maehwa: {
    name: "매화",
    emoji: "🌸",
    color: "from-rose-400 to-pink-700",
    accent: "#f472b6",
    img: "https://i.imgur.com/xCnXYAk.jpg",
    desc: "끝까지 곁을 지키는 사람입니다. 화려하지 않아도 가장 가까이에서, 가장 오래, 가장 묵묵히 함께합니다. 강단과 포근함을 동시에 지닌 존재입니다.",
    traits: ["끝까지 함께하는 충직함", "포근한 강단", "조용한 헌신", "감수성과 결단력"],
    quote: "이홍위의 마지막 순간까지 곁을 지킨 든든한 버팀목.",
  },
  geumsong: {
    name: "금성대군",
    emoji: "⚔️",
    color: "from-purple-500 to-violet-800",
    accent: "#a78bfa",
    img: "https://i.imgur.com/MaUUeYJ.jpg",
    desc: "불가능한 싸움인 줄 알면서도 신념을 위해 모든 것을 거는 사람입니다. 대의를 위해 두려움을 삼키고, 혼자서라도 역사의 흐름에 맞서려 합니다.",
    traits: ["굳은 신념과 대의", "불굴의 의지", "리더십과 결단", "두려움을 삼키는 용기"],
    quote: "이홍위가 두려워하던 서찰을 먼저 보낸 사람 — 혼자서도 역사에 맞섰다.",
  },
};

const questions = [
  {
    q: "가장 소중한 사람이 위험에 처했을 때, 당신은?",
    opts: [
      { text: "모든 것을 희생해서라도 지킨다", scores: { hongwi: 3, heungdo: 3, maehwa: 2, geumsong: 1, hanmyonghoe: 0 } },
      { text: "냉정하게 상황을 계산한 뒤 최선의 방법을 찾는다", scores: { hongwi: 0, heungdo: 0, maehwa: 0, geumsong: 2, hanmyonghoe: 3 } },
      { text: "투덜거리면서도 결국 몸을 던진다", scores: { hongwi: 0, heungdo: 3, maehwa: 1, geumsong: 0, hanmyonghoe: 0 } },
      { text: "신념을 믿고 함께 맞서 싸운다", scores: { hongwi: 1, heungdo: 0, maehwa: 1, geumsong: 3, hanmyonghoe: 0 } },
    ],
  },
  {
    q: "억울하고 부당한 상황에 처했을 때, 당신은?",
    opts: [
      { text: "속으로 삭이며 혼자 견딘다", scores: { hongwi: 3, heungdo: 0, maehwa: 1, geumsong: 0, hanmyonghoe: 1 } },
      { text: "현실을 받아들이고 내가 할 수 있는 것에 집중한다", scores: { hongwi: 0, heungdo: 3, maehwa: 2, geumsong: 0, hanmyonghoe: 2 } },
      { text: "언젠가 바로잡겠다는 의지로 준비한다", scores: { hongwi: 1, heungdo: 0, maehwa: 0, geumsong: 3, hanmyonghoe: 0 } },
      { text: "상황을 역이용하여 오히려 기회로 만든다", scores: { hongwi: 0, heungdo: 0, maehwa: 0, geumsong: 1, hanmyonghoe: 3 } },
    ],
  },
  {
    q: "나는 사람들 사이에서 주로 어떤 역할인가?",
    opts: [
      { text: "존재 자체로 사람들에게 의미가 되는 구심점", scores: { hongwi: 3, heungdo: 0, maehwa: 1, geumsong: 2, hanmyonghoe: 1 } },
      { text: "앞에 나서진 않지만 묵묵히 모두를 뒷받침하는 사람", scores: { hongwi: 0, heungdo: 2, maehwa: 3, geumsong: 0, hanmyonghoe: 0 } },
      { text: "분위기를 이끌고 사람들에게 방향을 제시하는 사람", scores: { hongwi: 0, heungdo: 1, maehwa: 0, geumsong: 3, hanmyonghoe: 2 } },
      { text: "냉정하게 판단해 팀의 실수를 막는 사람", scores: { hongwi: 1, heungdo: 0, maehwa: 0, geumsong: 1, hanmyonghoe: 3 } },
    ],
  },
  {
    q: "두려움 앞에서 나는?",
    opts: [
      { text: "두렵다는 걸 솔직히 인정하고 그럼에도 한 발 내딛는다", scores: { hongwi: 3, heungdo: 1, maehwa: 1, geumsong: 2, hanmyonghoe: 0 } },
      { text: "두려움을 감추고 아무렇지 않은 척 행동한다", scores: { hongwi: 0, heungdo: 2, maehwa: 2, geumsong: 1, hanmyonghoe: 2 } },
      { text: "두려움 자체를 분석해서 제거할 방법을 찾는다", scores: { hongwi: 0, heungdo: 0, maehwa: 0, geumsong: 1, hanmyonghoe: 3 } },
      { text: "신념이 두려움보다 크기 때문에 망설임 없이 뛰어든다", scores: { hongwi: 1, heungdo: 0, maehwa: 2, geumsong: 3, hanmyonghoe: 0 } },
    ],
  },
  {
    q: "가장 중요하게 여기는 가치는?",
    opts: [
      { text: "사람 — 내 사람들을 지키는 것", scores: { hongwi: 2, heungdo: 3, maehwa: 3, geumsong: 0, hanmyonghoe: 0 } },
      { text: "명분 — 옳은 것을 위해 싸우는 것", scores: { hongwi: 1, heungdo: 0, maehwa: 0, geumsong: 3, hanmyonghoe: 0 } },
      { text: "질서 — 체계와 안정이 있어야 모두가 산다", scores: { hongwi: 0, heungdo: 1, maehwa: 0, geumsong: 0, hanmyonghoe: 3 } },
      { text: "존엄 — 어떤 상황에서도 나답게 살아가는 것", scores: { hongwi: 3, heungdo: 0, maehwa: 1, geumsong: 1, hanmyonghoe: 1 } },
    ],
  },
  {
    q: "나의 감정 표현 방식은?",
    opts: [
      { text: "거의 드러내지 않는다 — 혼자 조용히 삭인다", scores: { hongwi: 3, heungdo: 0, maehwa: 1, geumsong: 1, hanmyonghoe: 2 } },
      { text: "투덜거리거나 타박하면서 표현한다 (실은 그게 애정)", scores: { hongwi: 0, heungdo: 3, maehwa: 0, geumsong: 0, hanmyonghoe: 0 } },
      { text: "행동으로 보여준다 — 옆에 있어주는 것이 전부", scores: { hongwi: 0, heungdo: 1, maehwa: 3, geumsong: 0, hanmyonghoe: 0 } },
      { text: "솔직하고 열정적으로 드러낸다", scores: { hongwi: 0, heungdo: 0, maehwa: 0, geumsong: 3, hanmyonghoe: 0 } },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [totals, setTotals] = useState({ hongwi: 0, heungdo: 0, hanmyonghoe: 0, maehwa: 0, geumsong: 0 });
  const [chosen, setChosen] = useState(null);
  const [fading, setFading] = useState(false);
  const [result, setResult] = useState(null);
  const [imgError, setImgError] = useState({});

  const pick = (opt) => {
    if (chosen !== null) return;
    setChosen(opt);
    const next = { ...totals };
    Object.keys(opt.scores).forEach(k => next[k] += opt.scores[k]);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setFading(true);
        setTimeout(() => { setTotals(next); setIdx(idx + 1); setChosen(null); setFading(false); }, 350);
      } else {
        setTotals(next);
        const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0][0];
        setResult(winner);
        setFading(true);
        setTimeout(() => { setScreen("result"); setFading(false); }, 400);
      }
    }, 500);
  };

  const restart = () => {
    setFading(true);
    setTimeout(() => {
      setScreen("intro"); setIdx(0); setChosen(null); setResult(null);
      setTotals({ hongwi: 0, heungdo: 0, hanmyonghoe: 0, maehwa: 0, geumsong: 0 });
      setFading(false);
    }, 300);
  };

  const c = result ? characters[result] : null;

  const S = {
    wrap: { minHeight: "100vh", background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", fontFamily: "'Noto Sans KR', sans-serif" },
    card: { maxWidth: 640, width: "100%", transition: "opacity .35s, transform .35s" },
  };

  return (
    <div style={S.wrap}>
      <div style={{ ...S.card, opacity: fading ? 0 : 1, transform: fading ? "scale(.97)" : "scale(1)" }}>

        {/* INTRO */}
        {screen === "intro" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: ".5rem" }}>🎬</div>
            <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 900, marginBottom: ".5rem", letterSpacing: "-1px" }}>왕과 사는 남자</h1>
            <p style={{ color: "#c4b5fd", fontSize: "1.05rem", marginBottom: ".25rem" }}>나는 어떤 인물일까?</p>
            <p style={{ color: "#7c7ca0", fontSize: ".88rem", marginBottom: "2rem", lineHeight: 1.7 }}>
              이홍위 · 엄흥도 · 한명회 · 매화 · 금성대군<br />6개의 질문으로 알아보는 나의 성격 유형
            </p>
            {/* 인물 카드 미리보기 */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: ".7rem", marginBottom: "2rem" }}>
              {Object.values(characters).map(ch => (
                <div key={ch.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".3rem" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: `2px solid ${ch.accent}`, boxShadow: `0 0 10px ${ch.accent}55` }}>
                    {!imgError[ch.name] ? (
                      <img src={ch.img} alt={ch.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={() => setImgError(p => ({ ...p, [ch.name]: true }))} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", background: "rgba(255,255,255,.07)" }}>{ch.emoji}</div>
                    )}
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: ".72rem" }}>{ch.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setScreen("quiz")} style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", border: "none", borderRadius: "2rem", padding: "1rem 2.8rem", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(124,58,237,.4)", letterSpacing: ".5px" }}>
              테스트 시작 →
            </button>
          </div>
        )}

        {/* QUIZ */}
        {screen === "quiz" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: "1.8rem", justifyContent: "center" }}>
              {questions.map((_, i) => (
                <div key={i} style={{ height: 5, borderRadius: 99, background: i <= idx ? "#818cf8" : "rgba(255,255,255,.15)", flex: i === idx ? 2.5 : 1, transition: "all .4s" }} />
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "1.5rem", padding: "2rem 1.8rem" }}>
              <p style={{ color: "#a5b4fc", fontSize: ".85rem", marginBottom: ".6rem" }}>Q{idx + 1} / {questions.length}</p>
              <h2 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.6rem", lineHeight: 1.55 }}>{questions[idx].q}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {questions[idx].opts.map((opt, i) => {
                  const isChosen = chosen === opt;
                  return (
                    <button key={i} onClick={() => pick(opt)} style={{
                      background: isChosen ? "rgba(129,140,248,.25)" : "rgba(255,255,255,.05)",
                      border: isChosen ? "1.5px solid #818cf8" : "1.5px solid rgba(255,255,255,.1)",
                      borderRadius: "1rem", padding: "1rem 1.3rem", color: isChosen ? "#c7d2fe" : "#e2e8f0",
                      fontSize: ".97rem", cursor: chosen ? "default" : "pointer", textAlign: "left",
                      transition: "all .2s", fontWeight: isChosen ? 700 : 400,
                      transform: isChosen ? "scale(1.02)" : "scale(1)",
                    }}>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && c && (
          <div>
            {/* 인물 이미지 */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div style={{ width: 160, height: 160, borderRadius: "50%", overflow: "hidden", border: `3px solid ${c.accent}`, boxShadow: `0 0 50px ${c.accent}66`, margin: "0 auto" }}>
                  {!imgError[c.name] ? (
                    <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={() => setImgError(p => ({ ...p, [c.name]: true }))} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", background: `linear-gradient(135deg,${c.accent}33,${c.accent}11)` }}>{c.emoji}</div>
                  )}
                </div>
                {/* 빛나는 링 효과 */}
                <div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: `2px solid ${c.accent}44`, pointerEvents: "none" }} />
              </div>
              <p style={{ color: c.accent, fontSize: ".85rem", fontWeight: 600, marginTop: "1rem", marginBottom: ".3rem", letterSpacing: "2px" }}>나와 닮은 인물</p>
              <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 900 }}>{c.name}</h2>
            </div>

            <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "1.4rem", padding: "1.6rem", marginBottom: "1.2rem" }}>
              <p style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: ".97rem" }}>{c.desc}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem", marginBottom: "1.2rem" }}>
              {c.traits.map((tr, i) => (
                <div key={i} style={{ background: `${c.accent}18`, border: `1px solid ${c.accent}40`, borderRadius: ".9rem", padding: ".7rem", color: "#e2e8f0", fontSize: ".85rem", textAlign: "center" }}>
                  ✦ {tr}
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,.04)", borderLeft: `3px solid ${c.accent}`, borderRadius: ".5rem", padding: "1rem 1.2rem", marginBottom: "1.4rem" }}>
              <p style={{ color: "#94a3b8", fontSize: ".88rem", lineHeight: 1.7, fontStyle: "italic" }}>{c.quote}</p>
            </div>

            {/* 유사도 바 */}
            <div style={{ background: "rgba(255,255,255,.05)", borderRadius: "1.2rem", padding: "1.2rem", marginBottom: "1.6rem" }}>
              <p style={{ color: "#64748b", fontSize: ".8rem", marginBottom: "1rem" }}>다른 인물들과의 유사도</p>
              {Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([k, v]) => {
                const ch = characters[k];
                const max = Math.max(...Object.values(totals));
                return (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".6rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${ch.accent}`, flexShrink: 0 }}>
                      {!imgError[ch.name] ? (
                        <img src={ch.img} alt={ch.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={() => setImgError(p => ({ ...p, [ch.name]: true }))} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem" }}>{ch.emoji}</div>
                      )}
                    </div>
                    <span style={{ color: "#94a3b8", fontSize: ".78rem", width: 90, textAlign: "left", flexShrink: 0 }}>{ch.name.split(" ")[0]}</span>
                    <div style={{ flex: 1, background: "rgba(255,255,255,.07)", borderRadius: 99, height: 7, overflow: "hidden" }}>
                      <div style={{ width: `${max ? (v / max) * 100 : 0}%`, height: "100%", background: k === result ? ch.accent : "rgba(255,255,255,.2)", borderRadius: 99, transition: "width 1s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={restart} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: "2rem", padding: ".8rem 2rem", color: "#e2e8f0", fontSize: ".95rem", cursor: "pointer", fontWeight: 600 }}>
                다시 테스트하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}