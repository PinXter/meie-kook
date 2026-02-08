import { getHealthinessColor } from '../../lib/utils';

export default function HealthBadge({ score }) {
    const color = getHealthinessColor(score);

    return (
        <div className="health-meter">
            <div className="health-meter__bar">
                <div
                    className={`health-meter__fill health-meter__fill--${color}`}
                    style={{ width: `${score * 10}%` }}
                />
            </div>
            <span className="health-meter__value">{score}</span>
        </div>
    );
}
