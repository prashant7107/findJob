# -*- coding: utf-8 -*-
import scrapy
import logging
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from urllib.parse import urljoin

from mero_carrer.items import MeroCarrerItem

class JobsCrawlerSpider(CrawlSpider):
    name = 'jobs_crawler'
    allowed_domains = ['merocareer.com']
    start_urls = ['http://merocareer.com/job']

    rules = (
        Rule(LinkExtractor(allow=r'job/'), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
             url = response.url
             title=response.css('.wrapper > div.page-heading.default > div.breadcrumbs-top > div > div > ul > li.current::text').extract_first()
             salary=response.css('.salary > div > div.content::text').extract_first()
             job_type=response.css('.job-type > div > div.content::text').extract_first()
             deadline=response.css('.year-exp > div > div.content::text').extract_first()
             location1=response.css('.address > div > div.content > a:nth-child(1)::text').extract_first()
             location2=response.css('.address > div > div.content > a:nth-child(2)::text').extract_first()
             location3=response.css('.address > div > div.content > a:nth-child(3)::text').extract_first()
             category=response.css('.category > div > div.content::text').extract_first()
             description=response.css('.job-detail-about > div > p::text').extract_first()
             if str(description)=='None':
                 description=''
             description2=response.css('.job-detail-about > div > blockquote > p::text').extract_first()
             if str(description2)=='None':
                 description2=''
             company=response.css('.info-top > h3::text').extract_first()
             requirements=''
             check_data='None'
             check_data_next='None'
             estring=''
             i=1
             while (check_data!=estring or check_data_next!=estring):
                turn=str(i)
                data_get=response.css('.job-detail-about > div > ul > li:nth-child('+turn+')::text').extract_first()
                data_get_next=response.css('.job-detail-about > div > blockquote > ul > li:nth-child('+turn+')::text').extract_first()
               # logging.debug('loggini the output to see result '+str(data_get))
                check_data=str(data_get)
                check_data_next=str(data_get_next)
                if check_data=='None':
                    check_data=''
                    data_get=''
                if check_data_next=='None':
                    check_data_next=''
                    data_get_next=''
                requirements= requirements + ' ' +str(data_get)+str(data_get_next)
                
                i+=1
             
             meroCarrerItem=MeroCarrerItem()
             meroCarrerItem['title']=str(title).strip()
             meroCarrerItem['salary']=str(salary).strip()
             meroCarrerItem['url']=str(url).strip()
             meroCarrerItem['job_type']=str(job_type).strip()
             meroCarrerItem['deadline']=str(deadline).strip()

             addr=location1+' '+location2+' '+location3
             meroCarrerItem['location']=str(addr).strip()

             meroCarrerItem['category']=str(category).strip()

             description_final=str(description).strip()+str(description2).strip()
             if description_final=='':
                description_final='None'
             meroCarrerItem['description']=description_final
           
           
             meroCarrerItem['company']=str(company).strip()
             
             
             requirements_final=str(requirements).strip()
             if requirements_final=='':
                 requirements_final='None'
             meroCarrerItem['requirements']=requirements_final

             yield meroCarrerItem 