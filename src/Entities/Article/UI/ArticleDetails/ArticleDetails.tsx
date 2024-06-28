/* eslint-disable indent */
/* eslint-disable react/display-name */
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/Shared/lib/classNames/classNames';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../Model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';

import { Skeleton as SkeltonRedesigned } from '@/Shared/UI/Skeleton';
import { Text as TextDeprecated, TextAlign } from '@/Shared/UI/Text/Text';
import { Text as TextRedesigned } from '@/Shared/UI/Text';
import { VStack } from '@/Shared/UI/Stack';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../Model/selectors/articleDetails';
import { fetchArticleById } from '../../Model/services/fetchArticleById/fetchArticleById';
import { renderArticleBlock } from './renderBlock';
import { AppImage } from '@/Shared/UI/AppImage';

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}
const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

// const Deprecated = () => {
//   const article = useSelector(getArticleDetailsData);

//   return (
//     <>
//       <HStack justify={"center"} max className={cls.avatarWrapper}>
//         <Avatar size={200} src={article?.img} className={cls.avatar} />
//       </HStack>
//       <VStack gap={"4"} max data-testid={"ArticleDetails.Info"}>
//         <TextDeprecated
//           className={cls.title}
//           title={article?.title}
//           text={article?.subtitle}
//           size={TextSize.L}
//         />
//         <HStack gap={"8"} className={cls.articleInfo}>
//           <Icon className={cls.icon} Svg={EyeIcon} />
//           <TextDeprecated text={String(article?.views)} />
//         </HStack>
//         <HStack gap={"8"} className={cls.articleInfo}>
//           <Icon className={cls.icon} Svg={CalendarIcon} />
//           <TextDeprecated text={article?.createdAt} />
//         </HStack>
//       </VStack>
//       {article?.blocks.map(renderArticleBlock)}
//     </>
//   );
// };

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <TextRedesigned title={article?.title} size={'l'} bold />
            <TextRedesigned title={article?.subtitle} />
            <AppImage
                fallback={
                    <SkeltonRedesigned
                        width={'100%'}
                        height={'420px'}
                        border={'16px'}
                    />
                }
                src={article?.img}
                className={cls.img}
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    // selectors for Page
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            // reducers get from back
            void dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;
    const Skeleton = SkeltonRedesigned;

    if (isLoading) {
        content = (
            <VStack gap={'16'} max>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border={'50%'}
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton
                    className={cls.skeleton}
                    width={'100%'}
                    height={200}
                />
                <Skeleton
                    className={cls.skeleton}
                    width={'100%'}
                    height={200}
                />
            </VStack>
        );
    } else if (error) {
        content = (
            <TextDeprecated
                align={'center'}
                title={t('Произошла ошибка при загрузке статьи')}
            />
        );
    } else {
        content = <Redesigned />;
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap={'16'}
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
