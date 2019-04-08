import scrapy
from mero_carrer.items import MeroCarrerItem

class JobDetails(scrapy.Spider):
    name='merocarrerspider'

    def start_requests(self):
        urls=[
            'https://merocareer.com/job/education-2//',
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)



    def parse(self,response):

             salary=response.css('.salary > div > div.content::text').extract_first()
             job_type=response.css('.job-type > div > div.content::text').extract_first()
             deadline=response.css('.year-exp > div > div.content::text').extract_first()

             meroCarrerItem=MeroCarrerItem()

             meroCarrerItem['salary']=salary
             meroCarrerItem['job_type']=job_type
             meroCarrerItem['deadline']=deadline
             yield meroCarrerItem 

     
