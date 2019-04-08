# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MeroCarrerItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title=scrapy.Field()
    salary=scrapy.Field()
    job_type=scrapy.Field()
    deadline=scrapy.Field() 
    url=scrapy.Field()
    location=scrapy.Field()
    category=scrapy.Field()
    description=scrapy.Field()
    company=scrapy.Field()
    requirements=scrapy.Field()
