package com.springBoot.practiceProject.report;

import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.springBoot.practiceProject.spring.model.Show;
import com.springBoot.practiceProject.spring.service.ShowService;

import java.io.*;
import java.net.URLEncoder;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Component
public class ShowReportGenerator implements ObjectReportGenerator<Show> {

	@Autowired
	private ShowService showService;

	@Override
	public ResponseEntity<byte[]> generateReport() throws Exception {

		List<Show> shows = showService.selectAll();

		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("Shows");

		Font titleFont = wb.createFont();
		titleFont.setFontHeightInPoints((short) 20);
		titleFont.setFontName("Arial");
		titleFont.setColor(IndexedColors.BLACK.getIndex());
		titleFont.setBold(true);
		titleFont.setItalic(true);

		CellStyle titleStyle = wb.createCellStyle();
		titleStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
		titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		titleStyle.setFont(titleFont);
		titleStyle.setBorderTop(BorderStyle.THIN);
		titleStyle.setBorderBottom(BorderStyle.THIN);
		titleStyle.setBorderLeft(BorderStyle.THIN);
		titleStyle.setBorderRight(BorderStyle.THIN);
		titleStyle.setTopBorderColor(IndexedColors.BLACK.index);
		titleStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		titleStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		titleStyle.setRightBorderColor(IndexedColors.BLACK.index);

		Font headerFont = wb.createFont();
		headerFont.setFontHeightInPoints((short) 15);
		headerFont.setFontName("Arial");
		headerFont.setColor(IndexedColors.BLACK.getIndex());
		headerFont.setBold(true);
		headerFont.setItalic(false);

		CellStyle headerStyle = wb.createCellStyle();
		headerStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFont(headerFont);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setTopBorderColor(IndexedColors.BLACK.index);
		headerStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		headerStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		headerStyle.setRightBorderColor(IndexedColors.BLACK.index);

		Font bodyFont = wb.createFont();
		bodyFont.setFontHeightInPoints((short) 15);
		bodyFont.setFontName("Arial");
		bodyFont.setColor(IndexedColors.BLACK.getIndex());
		bodyFont.setBold(false);
		bodyFont.setItalic(false);

		CellStyle bodyStyle = wb.createCellStyle();
		bodyStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
		bodyStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		bodyStyle.setAlignment(HorizontalAlignment.LEFT);
		bodyStyle.setFont(bodyFont);
		bodyStyle.setBorderTop(BorderStyle.THIN);
		bodyStyle.setBorderBottom(BorderStyle.THIN);
		bodyStyle.setBorderLeft(BorderStyle.THIN);
		bodyStyle.setBorderRight(BorderStyle.THIN);
		bodyStyle.setTopBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setBottomBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setLeftBorderColor(IndexedColors.BLACK.index);
		bodyStyle.setRightBorderColor(IndexedColors.BLACK.index);

		CellStyle dateStyle = wb.createCellStyle();
		dateStyle.cloneStyleFrom(bodyStyle);
		DataFormat dateFormat = wb.createDataFormat();
		dateStyle.setDataFormat(dateFormat.getFormat("yyyy-mm-dd"));
		
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
		Row row = sheet.createRow(0);
		Cell cell = row.createCell(0);
		cell.setCellValue("Logged Shows");
		cell.setCellStyle(titleStyle);

        ZonedDateTime estDateTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z");
        String formattedDateTime = estDateTime.format(formatter);

		sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 3));
		row = sheet.createRow(1);
		cell = row.createCell(0);
		cell.setCellValue("Exported on " + formattedDateTime);
		cell.setCellStyle(titleStyle);
		
		row = sheet.createRow(2);
		cell = row.createCell(0);
		cell.setCellValue("Show Name");
		cell.setCellStyle(headerStyle);
		cell = row.createCell(1);
		cell.setCellValue("Episodes Watched  "); // blank spaces so filter doesn't overlap with column header
		cell.setCellStyle(headerStyle);
		cell = row.createCell(2);
		cell.setCellValue("Date Last Watched  ");
		cell.setCellStyle(headerStyle);
		cell = row.createCell(3);
		cell.setCellValue("Rating  ");
		cell.setCellStyle(headerStyle);

		for (int i = 0; i < shows.size(); i++) {
			row = sheet.createRow(i + 3);
			cell = row.createCell(0);
			cell.setCellValue(shows.get(i).getShowName());
			cell.setCellStyle(bodyStyle);
			cell = row.createCell(1);
			cell.setCellValue(shows.get(i).getEpisodesWatched());
			cell.setCellStyle(bodyStyle);
			cell = row.createCell(2);
			cell.setCellValue(shows.get(i).getDateLastWatched());
			cell.setCellStyle(dateStyle);
			cell = row.createCell(3);
			cell.setCellValue(shows.get(i).getUserRating());
			cell.setCellStyle(bodyStyle);
		}
		
		int numCols = 4;
		for (int i = 0; i < numCols; i++) {
			sheet.setColumnWidth(i, 256 * 40); 
		}
		
		CellRangeAddress range = new CellRangeAddress(2, 2000, 0, 3);
		sheet.setAutoFilter(range);
		sheet.createFreezePane(0, 1);
		sheet.setDisplayGridlines(true);

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		wb.write(outputStream);
		byte[] fileBytes = outputStream.toByteArray();
		wb.close();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(
				MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
		try {
			String encodedFileName = URLEncoder.encode("shows.xlsx", "UTF-8");
			headers.set("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);

	}

}
