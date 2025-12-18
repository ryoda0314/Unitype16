import config from "./config.json";

export interface Answer {
    id: string;
    value: number; // 0-6 (strongly disagree to strongly agree)
}

export interface AxisResult {
    score: number;
    pole: string;
}

export function calculateScores(answers: Record<string, number>): Record<string, number> {
    const itemScores: Record<string, number[]> = {
        MP: [],
        AS: [],
        CU: [],
        IN: [],
    };

    config.items.forEach((item) => {
        const userValue = answers[item.id];
        if (userValue !== undefined) {
            // pos = idx - 3 (maps 0-6 to -3 to 3)
            const pos = userValue - 3;

            // score = (agreeSide == 'R') ? pos : -pos
            const score = item.agreeSide === "R" ? pos : -pos;

            itemScores[item.axis].push(score);
        }
    });

    const axisScores: Record<string, number> = {};

    Object.keys(itemScores).forEach((axis) => {
        const scores = itemScores[axis];
        if (scores.length > 0) {
            const average = scores.reduce((a, b) => a + b, 0) / scores.length;
            axisScores[axis] = average;
        } else {
            axisScores[axis] = 0;
        }
    });

    return axisScores;
}

export function determineType(scores: Record<string, number>): string {
    const m_p = scores.MP >= 0 ? "P" : "M";
    const a_s = scores.AS >= 0 ? "S" : "A";
    const c_u = scores.CU >= 0 ? "U" : "C";
    const i_n = scores.IN >= 0 ? "N" : "I";

    return `${m_p}${a_s}${c_u}${i_n}`;
}

export function getAxisResult(axis: string, score: number) {
    const axesForResult = config.axesForResult as any;
    const configAxis = axesForResult[axis];

    if (!configAxis) return null;

    return {
        score,
        pole: score >= 0 ? configAxis.rightPole : configAxis.leftPole,
        label: score >= 0 ? axis[1] : axis[0]
    };
}
