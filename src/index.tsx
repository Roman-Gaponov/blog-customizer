import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, TApplyStyles } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
    // стейты стилизации страницы, которые кастомизирует сайдбар
    const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption.value)
    const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption.value)
    const [fontColor, setFontColor] = useState(defaultArticleState.fontColor.value)
    const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth.value)
    const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor.value)

    const setApplyStyles = ({ fontFamily, fontSize, fontColor, contentWidth, backgroundColor }: TApplyStyles) => {
        setFontFamily(fontFamily);
        setFontSize(fontSize);
        setFontColor(fontColor);
        setContentWidth(contentWidth);
        setBackgroundColor(backgroundColor);
    }

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
                    '--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--container-width': contentWidth,
					'--bg-color': backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={setApplyStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
