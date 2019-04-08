import scrapy
filename='merocarrer.txt'

class IntroSpider(scrapy.Spider):
    name="merocarre"

    def start_requests(self):
        urls=[
            'https://merocareer.com/job/teacher',
           
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        job_list = response.xpath('//*[@id="job-detail-content"]/div[1]/ul/li[5]/div/div[2]')\
                    .extract()
                
        with open(filename, 'a+') as f:
            for merocarrer in job_list:
                f.write(merocarrer + "\n")