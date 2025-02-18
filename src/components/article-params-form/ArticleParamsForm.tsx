import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState, useRef } from 'react';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleState = () => {
		setIsOpen((prevState) => !prevState);
	};

	useOutsideClickClose({ isOpen, rootRef, onChange: setIsOpen });

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} onClick={toggleState} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}
				>
					<form className={styles.form}>
						<Text as={'h2'} weight={800} size={31} uppercase>
							задайте параметры
						</Text>
						<Select
							title='шрифт'
							selected={defaultArticleState.fontFamilyOption}
							options={fontFamilyOptions}
						/>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							selected={defaultArticleState.fontSizeOption}
							options={fontSizeOptions}
						/>
						<Select
							title='цвет шрифта'
							selected={defaultArticleState.fontColor}
							options={fontColors}
						/>
						<Separator></Separator>
						<Select
							title='цвет фона'
							selected={defaultArticleState.backgroundColor}
							options={backgroundColors}
						/>
						<Select
							title='ширина контента'
							selected={defaultArticleState.contentWidth}
							options={contentWidthArr}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
