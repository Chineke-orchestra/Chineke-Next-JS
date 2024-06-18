import React from 'react';
import {
  ExploreSection,
  StoriesCarousel,
  Accordion,
  StatsAndFigures,
  OurTeam,
  PartnersList,
  TestimonialsListing,
  SupportCarousel,
  TestimonialsCarousel,
  EventsCarousel,
  LatestNews,
  VideoCarousel,
  EventsList,
  Pattern,
  TwoColumnText,
  Hero,
  ThreeColumnLayout,
  StaticTwoColumns,
  Feature,
  TwoColumnsList,
  RteSingleColumn,
  TimelineVariation1,
  TimelineVariation2,
  TimelineVariation3,
  WatchAndListen,
  InternalHeroBanner,
} from 'components';
import {
  formatCardData,
  formatCardWithImageData,
  formatLink,
  formatMedia,
  formatTagsData,
  formatWatchAndListenData,
} from 'utils/adaptors';
import { PatternProps } from 'components/Pattern/Pattern';
import { TwoColumnTextProps } from 'components/TwoColumnText/TwoColumnText';
import { HeroProps } from 'components/Hero/Hero';
import { ThreeColumnLayoutProps } from 'components/ThreeColumnLayout/ThreeColumnLayout';
import { StaticTwoColumnsProps } from 'components/StaticTwoColumns/StaticTwoColumns';
import { FeatureProps } from 'components/Feature/Feature';
import { I_Testimonial } from 'components/TestimonialsCarousel/TestimonialsCarousel';
import { TwoColumnsListProps } from 'components/TwoColumnsList/TwoColumnsList';
import PartnersBanner, {
  PartnersBannerProps,
} from 'components/PartenersBanner/PartnersBanner';
import ImagesGallery from 'components/ImagesGallery/ImagesGallery';

const ComponentsListing = ({ components }: { components: any }) => {
  const PrintComponent = ({ component }: any) => {
    switch (component?.type) {
      case 'paragraph--hero_banner':
        const heroProps: HeroProps = {
          title: component?.field_title,
          links: component?.field_links.map((item: any) => formatLink(item)),
          video: formatMedia(component?.field_video?.field_media_video_file),
          externalVideo: component?.field_video?.field_media_oembed_video,
          image: formatMedia(component?.field_mobile_image?.field_media_image),
        };

        return <Hero {...heroProps} />;

      case 'paragraph--static_2_column':
        const staticTwoColumnProps: StaticTwoColumnsProps = {
          backgroundColor: component?.field_background_color?.color,
          imagePosition: component?.field_image_position,
          title: component?.field_title,
          headline: component?.field_headline,
          ctaLink: formatLink(component?.field_cta_button),
          ctaIcon: formatMedia(
            component?.field_cta_link_icon?.field_media_image,
          ),
          image: formatMedia(
            component?.field_static_2_column_image?.field_media_image,
          ),
          cards: component?.field_2_columns_text.map((item: any) => {
            return {
              link: formatLink(item?.field_link),
              text: item.field_rich_text,
              icon: formatMedia(item?.field_cta_link_icon?.field_media_image),
              withParse: item?.withParse || false,
            };
          }),
        };
        return <StaticTwoColumns {...staticTwoColumnProps} />;

      case 'paragraph--explore_section_variation_1':
        return (
          <ExploreSection
            variation="variation_one"
            title={component?.field_title}
            cards={formatCardData(component?.field_cards)}
            backgroundImage={formatMedia(
              component?.field_background_image?.field_media_image,
            )}
          />
        );

      case 'paragraph--explore_section_variation_2':
        return (
          <ExploreSection
            variation="variation_two"
            cards={formatCardData(component?.field_cards)}
            featuredCard={{
              title: component?.field_featured_link?.title,
              body: component?.field_featured_link?.body?.value,
              link: formatLink(component?.field_link),
              image: formatMedia(
                component?.field_featured_link.field_feature_image
                  .field_media_image,
              ),
              tags: formatTagsData(
                component?.field_featured_link?.field_tags_category,
              ),
            }}
          />
        );
      case 'paragraph--stories_carousel':
        return (
          <StoriesCarousel
            title={component?.field_carousel_title}
            body={component?.field_body?.value}
            tagline={component?.field_tagline}
            link={formatLink(component?.field_cta_button)}
            cards={formatCardWithImageData(component?.field_story_card)}
          />
        );

      case 'paragraph--pattern':
        const patternProps: PatternProps = {
          patternBackground: component?.field_pattern_background_colour,
          patternImage: formatMedia(
            component?.field_pattern_image?.field_media_image_1,
          ),
          patternColor: component?.field_pattern_image_colour,
        };

        return <Pattern {...patternProps} />;

      case 'paragraph--2_column_text':
        const twoColumnTextPropsData: TwoColumnTextProps = {
          textLeft: component?.field_left_column_text?.value,
          textRight: component?.field_right_column_text?.value,
        };

        return <TwoColumnText {...twoColumnTextPropsData} />;
      case 'paragraph--rte_single_column':
        const singleColumnPropsData = {
          text: component?.field_text?.value,
        };

        return <RteSingleColumn {...singleColumnPropsData} />;
      case 'paragraph--3_column_layout':
        const threeColumnLayoutProps: ThreeColumnLayoutProps = {
          image: formatMedia(component?.field_3col_image?.field_media_image),
          title: component?.field_3col_title,
          text: component?.field_3col_body_text?.value,
        };

        return <ThreeColumnLayout {...threeColumnLayoutProps} />;

      case 'paragraph--feature':
        const featurePropsData = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featurePropsData} />;
      case 'paragraph--rte_single_column':
        const singleColumnProps = {
          text: component?.field_text?.value,
        };

        return <RteSingleColumn {...singleColumnProps} />;

      case 'paragraph--2_column_text':
        const twoColumnTextProps = {
          textLeft: component?.field_left_column_text?.value,
          textRight: component?.field_right_column_text?.value,
        };

        return <TwoColumnText {...twoColumnTextProps} />;
      case 'paragraph--feature':
        const featureProps: FeatureProps = {
          headline: component?.field_tagline_text,
          title: component?.field_feature_title,
          text: component?.field_feature_text?.value,
          ctaLink: formatLink(component?.field_feature_cta_button),
          image: formatMedia(component?.field_image?.field_media_image_2),
        };

        return <Feature {...featureProps} />;

      case 'paragraph--accordion':
        const accordionItems = component?.field_accordion_item?.map(
          (item: any) => {
            return {
              title: item?.field_accordion_title,
              text: item?.field_accordion_body?.value,
            };
          },
        );
        return (
          <Accordion title={component?.field_title} items={accordionItems} />
        );
      case 'paragraph--testimonials': {
        const formattedTestimonialsData: I_Testimonial[] =
          component?.field_testimonial?.map((item: any) => {
            return {
              author: item?.field_author,
              text: item?.field_testimonial,
            };
          });
        const pattern: PatternProps = {
          patternBackground: component?.field_pattern_background_colour,
          patternImage: formatMedia(
            component?.field_pattern_image?.field_media_image_1,
          ),
          patternColor: component?.field_pattern_image_colour,
        };
        return (
          <TestimonialsCarousel
            testimonials={formattedTestimonialsData}
            pattern={pattern}
          />
        );
      }

      case 'paragraph--bullet_point_text':
        const twoColumnsList: TwoColumnsListProps = {
          title: component?.field_title,
          list: component?.field_list_text,
          text: component?.field_body_text?.value,
          backgroundColor: component?.field_background_color?.color,
          listStyle: component?.field_list,
        };

        return <TwoColumnsList {...twoColumnsList} />;

      case 'paragraph--stories_carousel':
        return (
          <StoriesCarousel
            title={component?.field_title}
            body={component?.field_body?.value}
            tagline={component?.field_tagline}
            link={formatLink(component?.field_cta_button)}
            cards={formatCardWithImageData(component?.field_story_card)}
          />
        );

      case 'paragraph--internal_hero_banner':
        return (
          <InternalHeroBanner
            maskColor={component?.field_mask_colour?.color}
            maskPosition={component?.field_image_mask}
            image={formatMedia(component?.field_image?.field_media_image_2)}
            externalVideo={component?.field_video?.field_media_oembed_video}
            externalVideoTitle={component?.field_video?.field_title}
            externalVideoTags={component?.field_video?.field_tags?.map(
              (tag: any) => tag.name,
            )}
          />
        );
      case 'paragraph--partners_list': {
        const logos = component?.field_logo?.map((item: any) => {
          return formatMedia(item?.field_media_image_4);
        });
        return (
          <PartnersList
            logos={logos}
            title={component?.field_title}
            tagline={component?.field_tagline}
          />
        );
      }

      case 'paragraph--testimonial_list':
        const testimonialsData = component?.field_testimonial_card?.map(
          (item: any) => {
            return {
              author: item?.field_author,
              date: item?.field_date_time,
              text: item?.field_testimonial,
            };
          },
        );
        return (
          <TestimonialsListing
            title={component?.field_testimonial_title}
            testimonials={testimonialsData}
          />
        );
      case 'paragraph--event_carousel': {
        return (
          <EventsCarousel
            title={component?.field_event_carousel_title}
            body={component?.field_body?.value}
            tagline={component?.field_tagline}
            link={formatLink(component?.field_cta)}
            cards={component?.events}
          />
        );
      }

      case 'paragraph--support_carousel': {
        const cards = component?.field_support_card?.map((item: any) => {
          return {
            title: item?.field_sup_text,
            text: item?.field_sup_card_body_text,
            link: formatLink(item?.field_url),
          };
        });
        return (
          <SupportCarousel
            title={component?.field_sup_carousel_title}
            tagline={component?.field_tagline_text}
            body={component?.field_sup_body_text?.value}
            cards={cards}
            link={formatLink(component?.field_cta_button)}
          />
        );
      }

      case 'paragraph--our_team': {
        const cards = component?.field_team_cards?.map((item: any) => {
          return {
            title: item?.field_card_title,
            tagline: item?.field_tagline,
            backgroundColor: item?.field_card_background_color?.color,
            image: formatMedia(item?.field_featured_image?.field_media_image_2),
          };
        });
        return <OurTeam title={component?.field_title} cards={cards} />;
      }

      case 'paragraph--facts_figures': {
        const stats = component?.field_stats.map((item: any) => {
          return {
            text: item?.field_stats_text,
            title: item?.field_stats_title,
          };
        });
        return (
          <StatsAndFigures
            title={component?.field_facts_title}
            image={formatMedia(
              component?.field_facts_image?.field_media_image_3,
            )}
            stats={stats}
          />
        );
      }
      case 'paragraph--video_carousel': {
        const videos = component?.field_media_card?.map((item: any) => {
          return {
            image: formatMedia(item?.field_feature_img),
            videoLink: item?.field_media_oembed_video,
            title: item?.name,
          };
        });
        return (
          <VideoCarousel
            title={component?.field_title}
            link={formatLink(component?.field_cta_button)}
            videos={videos}
          />
        );
      }

      case 'paragraph--event_list': {
        return <EventsList cards={component?.events} />;
      }

      case 'paragraph--partners_banner':
        const partnersHeroProps: PartnersBannerProps = {
          title: component?.field_title,
          backgroundColor: component?.field_partners_background_colour?.color,
          logos: component?.field_partners_banner_logo.map((item: any) => {
            return formatMedia(item?.field_media_image_4);
          }),
        };

        return <PartnersBanner {...partnersHeroProps} />;

      case 'paragraph--images_gallery': {
        const galleryImages = component?.field_gallery_images?.map(
          (item: any) => {
            return formatMedia(item?.field_media_image);
          },
        );
        return <ImagesGallery images={galleryImages} />;
      }

      case 'paragraph--timeline_variation_1': {
        const timelineItemsVariation1 = component?.field_timeline_item.map(
          (item: any) => {
            return {
              title: item?.field_title,
              text: item?.field_timeline_text_body,
            };
          },
        );
        return (
          <TimelineVariation1
            headline={component?.field_headline}
            timelineItems={timelineItemsVariation1}
            imageOne={formatMedia(
              component?.field_featured_image?.field_media_image_2,
            )}
            imageOneText={component?.field_feature_image_text}
            imageTwo={formatMedia(
              component?.field_secondary_image?.field_media_image,
            )}
          />
        );
      }

      case 'paragraph--timeline_variation_2': {
        const timelineItemsVariation2 = component?.field_timeline_item.map(
          (item: any) => {
            return {
              title: item?.field_title,
              text: item?.field_timeline_text_body,
            };
          },
        );
        return (
          <TimelineVariation2
            headline={component?.field_headline}
            timelineItems={timelineItemsVariation2}
            imageOne={formatMedia(component?.field_image?.field_media_image_2)}
            imageOneText={component?.field_feature_image_text}
          />
        );
      }

      case 'paragraph--timeline_variation_3': {
        const timelineItemsVariation3 = component?.field_timeline_item.map(
          (item: any) => {
            return {
              title: item?.field_title,
              text: item?.field_timeline_text_body,
            };
          },
        );
        return (
          <TimelineVariation3
            headline={component?.field_headline}
            timelineItems={timelineItemsVariation3}
            imageOne={formatMedia(
              component?.field_timeline_item[0]?.field_image
                ?.field_media_image_2,
            )}
            imageOneText={
              component?.field_timeline_item[0]?.field_feature_image_text
            }
            imageTwo={formatMedia(
              component?.field_timeline_item[1]?.field_image
                ?.field_media_image_2,
            )}
            imageTwoText={
              component?.field_timeline_item[1]?.field_feature_image_text
            }
            imageThree={formatMedia(
              component?.field_timeline_item[2]?.field_image
                ?.field_media_image_2,
            )}
            imageThreeText={
              component?.field_timeline_item[2]?.field_feature_image_text
            }
          />
        );
      }
      case 'paragraph--watch_listen': {
        return (
          <WatchAndListen
            data={formatWatchAndListenData(component?.field_media)}
          />
        );
      }

      case 'paragraph--latest_news':
        return <LatestNews news={component?.news} />;

      default:
        return <p>block {component?.type} was not implemented</p>;
    }
  };

  return (
    <>
      {components &&
        components.length > 0 &&
        components.map((component: any, index: number) => (
          <PrintComponent key={index} component={component} />
        ))}
    </>
  );
};

export default React.memo(ComponentsListing);
