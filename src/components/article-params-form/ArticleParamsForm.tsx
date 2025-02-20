import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState, useRef, FormEvent } from 'react';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';

type ArticleParamsFormPropsType = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormPropsType) => {
	// пробрасываем в качестве пропса стейт статьи
	const { articleState, setArticleState } = props;

	// стейт для открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	const toggleState = () => {
		setIsOpen((prevState) => !prevState);
	};

	// переиспользуем кастомный хук (для этого добавили дополнительную div-обёртку)
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });

	// стейты для компонентов сайдбара
	const [font, setFont] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	// обработчик клика по кнопке "применить"
	const handleApplyButtonClick = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	// обработчик клика по кнопке "сбросить"
	const handleClearButtonClick = () => {
		setArticleState(defaultArticleState);

		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					// передаём оба обработчика не на кнопки, а на форму
					onReset={handleClearButtonClick}
					onSubmit={handleApplyButtonClick}>
					<Text as={'h2'} weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={font}
						options={fontFamilyOptions}
						onChange={setFont}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
