import React from 'react';

import css from './styles.less';

const Progress = (props) => {
    const { radius, stroke, score } = props;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference -  score * 10 / 100 * circumference;

    return (
        <div className={css.wrapper}>
            <div className={css.score} style={{ width: radius/2, height: radius/2 }}>{props.score}</div>
            <svg
                height={radius * 2}
                width={radius * 2}
                >
                <circle
                stroke="#1AB1E1"
                className={css.progressRingCircle}
                fill="transparent"
                strokeWidth={ stroke }
                strokeDasharray={ circumference + ' ' + circumference }
                style={ { strokeDashoffset } }
                r={ normalizedRadius }
                cx={ radius }
                cy={ radius }
                />
            </svg>
        </div>
    );
};

export default Progress;