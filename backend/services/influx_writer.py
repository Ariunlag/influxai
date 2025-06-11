from influxdb_client import InfluxDBClient, Point
from config import settings

class InfluxWriter:
    def __init__(self):
        self.client = None
        self.write_api = None
        self.query_api = None

    def connect(self):
        self.client = InfluxDBClient(
            url=settings.influx_url,
            token=settings.influx_token,
            org=settings.influx_org
        )
        self.write_api = self.client.write_api()
        self.query_api = self.client.query_api()
        print(f"✅ Connected to InfluxDB at {settings.influx_url}")

    def write_point(self, measurement: str, tags: dict, fields: dict):
        point = Point(measurement).tag(**tags).field(**fields)
        self.write_api.write(bucket=settings.influx_bucket, record=point)

    def query(self, flux: str):
        return self.query_api.query(org=settings.influx_org, query=flux)

influx_writer = InfluxWriter()
