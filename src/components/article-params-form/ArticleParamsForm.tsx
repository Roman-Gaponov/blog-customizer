import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState, useRef, SyntheticEvent, useEffect } from 'react';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';
import { OptionType, TApplyStyles } from '../../constants/articleProps';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	onApply: ({
		fontFamily,
		fontSize,
		fontColor,
		contentWidth,
		backgroundColor,
	}: TApplyStyles) => void;
};

export const ArticleParamsForm = ({ onApply }: TArticleParamsFormProps) => {
	// стейт для открытия/закрытия сайдбара
    const [isOpen, setIsOpen] = useState(false);

	const toggleState = () => {
		setIsOpen((prevState) => !prevState);
	};

    // переиспользуем кастомный хук (для этого добавили дополнительную div-обёртку)
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });

    // стейты для компонентов сайдбара
	const [selectFont, setSelectFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectFontSize, setSelectFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectFontColor, setSelectFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectBackgroundColor, setSelectBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectContentWidth, setSelectContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const onChangeSelectFont = (selected: OptionType) => {
		setSelectFont(selected);
	};

	const onChangeSelectFontSize = (selected: OptionType) => {
		setSelectFontSize(selected);
	};

	const onChangeSelectFontColor = (selected: OptionType) => {
		setSelectFontColor(selected);
	};

	const onChangeSelectBackgroundColor = (selected: OptionType) => {
		setSelectBackgroundColor(selected);
	};

	const onChangeSelectContentWidth = (selected: OptionType) => {
		setSelectContentWidth(selected);
	};

    // обработчик клика по кнопке "применить"
	const handleApplyButtonClick = (e?: SyntheticEvent) => {
		e?.preventDefault();
		onApply({
			fontFamily: selectFont.value,
			fontSize: selectFontSize.value,
			fontColor: selectFontColor.value,
			contentWidth: selectContentWidth.value,
			backgroundColor: selectBackgroundColor.value,
		});
	};

    // обработчик клика по кнопке "сбросить" 
	const handleClearButtonClick = () => {
		onApply({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});

		setSelectFont(defaultArticleState.fontFamilyOption);
		setSelectFontSize(defaultArticleState.fontSizeOption);
		setSelectFontColor(defaultArticleState.fontColor);
		setSelectBackgroundColor(defaultArticleState.backgroundColor);
		setSelectContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} onClick={toggleState} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text as={'h2'} weight={800} size={31} uppercase>
							задайте параметры
						</Text>
						<Select
							title='шрифт'
							selected={selectFont}
							options={fontFamilyOptions}
							onChange={onChangeSelectFont}
						/>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							selected={selectFontSize}
							options={fontSizeOptions}
							onChange={onChangeSelectFontSize}
						/>
						<Select
							title='цвет шрифта'
							selected={selectFontColor}
							options={fontColors}
							onChange={onChangeSelectFontColor}
						/>
						<Separator />
						<Select
							title='цвет фона'
							selected={selectBackgroundColor}
							options={backgroundColors}
							onChange={onChangeSelectBackgroundColor}
						/>
						<Select
							title='ширина контента'
							selected={selectContentWidth}
							options={contentWidthArr}
							onChange={onChangeSelectContentWidth}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleClearButtonClick}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={handleApplyButtonClick}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
