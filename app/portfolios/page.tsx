'use client';
import { useEffect, useState } from 'react';

import { CircularProgress, Container, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { getQuestionnairesList } from '@/actions/actions';
import { MainBox } from '@/components/CommonComponents/Common-сomponents-style';
import CompletedButEmptyPortfolioCardItem from '@/components/Portfolios/Completed-but-empty-portfolio-card-item';
import IncompletedPortfolioCardItem from '@/components/Portfolios/Incompleted-portfolio-card-item';
import { selectAccessKey } from '@/store/slices/sessionSlice';

import {
  PortfoliosTitle,
  PortfoliosSubtitle,
  PortfolioCardTitle,
  PortfolioCardsList,
  PortfolioCardItem,
  PortfolioCardSubtitle,
  SecondaryButtonForPortfolioCard,
  PortfolioCardItemSkeleton,
} from '../../components/Portfolios/Portfolios-style';

export interface IPortfolioCard {
  portfolio_id: string;
  done: boolean;
}

export default function Portfolios() {
  const theme = useTheme();
  const accessKey = useSelector(selectAccessKey);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessKey) {
      // router.push('/');
    } else {
      const fetchData = async () => {
        const data = await getQuestionnairesList(accessKey);
        if (data) {
          setQuestionnairesList(data);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [accessKey]);

  const [questionnairesList, setQuestionnairesList] =
    useState<IPortfolioCard[]>();

  return (
    <MainBox>
      <Container
        sx={{ maxWidth: theme.breakpoints.values.containersMd }}
        maxWidth={false}
      >
        <PortfoliosTitle variant="h1">Portfolios</PortfoliosTitle>

        <PortfoliosSubtitle>
          Here are all your created portfolios and all the analytics about them
        </PortfoliosSubtitle>

        <PortfolioCardsList>
          <PortfolioCardItem>
            <PortfolioCardTitle variant="h2">
              Create new portfolio
            </PortfolioCardTitle>

            <PortfolioCardSubtitle>
              Take the questionnaire and create a new portfolio
            </PortfolioCardSubtitle>

            <SecondaryButtonForPortfolioCard
              type="button"
              fullWidth
              size="small"
              variant="contained"
              href="/start-the-questionnaire"
            >
              take a survey
            </SecondaryButtonForPortfolioCard>
          </PortfolioCardItem>

          {isLoading && (
            <PortfolioCardItemSkeleton>
              <CircularProgress />
            </PortfolioCardItemSkeleton>
          )}

          {questionnairesList && questionnairesList.length > 0 && (
            <>
              {questionnairesList.map((portfolio: IPortfolioCard) => {
                // закладка - так будет выглядеть карточка портофлио у которого будут данные о доходности и инвестированной сумме
                // if (portfolio.profitability) {
                //   return (
                //     <CompletedPortfolioCardItem
                //       currency={portfolio.currency}
                //       amount={portfolio.amount}
                //       number={portfolio.number}
                //       profitability={portfolio.profitability}
                //       link={portfolio.link}
                //       key={portfolio.number}
                //     />
                //   );
                // }
              })}
              {questionnairesList.map((portfolio: IPortfolioCard) => {
                if (portfolio.done) {
                  return (
                    <CompletedButEmptyPortfolioCardItem
                      id={portfolio.portfolio_id}
                      key={portfolio.portfolio_id}
                    />
                  );
                }
              })}
              {questionnairesList.map((portfolio: IPortfolioCard) => {
                if (!portfolio.done) {
                  return (
                    <IncompletedPortfolioCardItem
                      id={portfolio.portfolio_id}
                      key={portfolio.portfolio_id}
                    />
                  );
                }
              })}
            </>
          )}
        </PortfolioCardsList>
      </Container>
    </MainBox>
  );
}
